using System.Collections;
using UnityEngine;
using Microsoft.MixedReality.Toolkit.Input;
using Microsoft.MixedReality.Toolkit.Utilities;
using Microsoft.MixedReality.Toolkit;
using Microsoft.MixedReality.Toolkit.UI;

public class ButtonHand : MonoBehaviour, IMixedRealityTouchHandler
{
    [Tooltip("Duration for which the left index finger must stay inside the button")]
    public float duration = 0.01f;  // set to desired value

    public delegate void ButtonActionHandler(ButtonAction action);
    public event ButtonActionHandler ButtonActionTriggered;

    public ButtonAction buttonAction;  // set this in inspector or elsewhere

    private IMixedRealityHandJointService handJointService;
    private BoxCollider buttonCollider;
    private PressableButton pressableButton;
    private bool isIndexInside = false;
    private float timeEntered;
    private HandButtonHandler handButtonHandler;
    public bool rightHandClick = false;
    DyiPinchGrab dyiPinchGrab;

    public float pressCooldown = 0.5f; // Durée pendant laquelle le bouton ne peut pas être réactivé par toucher après avoir été pressé. Définissez à la valeur souhaitée.
    private float lastPressedTime = -Mathf.Infinity;

    private void Start()
    {
        buttonCollider = GetComponent<BoxCollider>();
        handJointService = CoreServices.GetInputSystemDataProvider<IMixedRealityHandJointService>();
        pressableButton = GetComponent<PressableButton>();
        pressableButton = GetComponent<PressableButton>();
        pressableButton.ButtonPressed.AddListener(OnButtonPressed);
        handButtonHandler = GameObject.Find("HandButton").GetComponent<HandButtonHandler>();
        dyiPinchGrab = GameObject.Find("GestureController").GetComponent<DyiPinchGrab>();
    }

    private void OnDestroy()
    {
        pressableButton.ButtonPressed.RemoveListener(OnButtonPressed);
    }

    private void Update()
    {
    }

    public void OnTouchStarted(HandTrackingInputEventData eventData)
    {
        Debug.Log("TOUCH STARTED");
        if (Time.time - handButtonHandler.lastPressedTime < pressCooldown)
        {
            Debug.Log("Button press cooldown in effect.");
            return;
        }
        if (eventData.Handedness == HandsPreference.handInvokeMenuAnnotation || (eventData.Handedness == HandsPreference.handInvokeMenuHand && rightHandClick))
        {
            Transform indexTip = handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, HandsPreference.handInvokeMenuAnnotation);
            bool isRightHand = eventData.Handedness == HandsPreference.handInvokeMenuHand;
            if (buttonCollider.bounds.Contains(indexTip.position)
                || (rightHandClick
                && isRightHand
                && buttonCollider.bounds.Contains(handJointService.RequestJointTransform(TrackedHandJoint.IndexTip, HandsPreference.handInvokeMenuHand).position)
                && !dyiPinchGrab.IsPalmUp(HandsPreference.handInvokeMenuHand)))
            {
                isIndexInside = true;
                timeEntered = Time.time;
                StartCoroutine(CheckDuration());
            }
        }
    }

    public void OnButtonPressed()
    {
        Debug.Log("Button was pressed!");
        handButtonHandler.lastPressedTime = Time.time;
    }

    public void OnTouchCompleted(HandTrackingInputEventData eventData)
    {
        Debug.Log("TOUCH COMPLETED");
        isIndexInside = false;
     //   StartCoroutine(DisableColliderTemporarily());
    }

    private IEnumerator DisableColliderTemporarily()
    {
        buttonCollider.enabled = false;
        yield return new WaitForSeconds(0.2f); // attendre 0.2 secondes
        buttonCollider.enabled = true;
    }

    public void OnTouchUpdated(HandTrackingInputEventData eventData)
    {
    }

    private IEnumerator CheckDuration()
    {
        while (isIndexInside)
        {
            if (Time.time - timeEntered >= duration)
            {
                pressableButton.ButtonPressed.Invoke();
                isIndexInside = false;  // Prevent multiple triggers
                if (gameObject.activeSelf)
                {
                    StartCoroutine(InvokeRelease());
                }
            }
            yield return null;  // wait for the next frame
        }
    }

    private IEnumerator InvokeRelease()
    {
        yield return new WaitForSeconds(0.4f); // attendre 0.2 secondes
        if (gameObject.activeSelf)
        {
            pressableButton.ButtonReleased.Invoke();
        }

    }

}