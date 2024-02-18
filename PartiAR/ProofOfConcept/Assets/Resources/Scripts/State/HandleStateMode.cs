using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class HandleStateMode : MonoBehaviour
{
    public StateMachine modeStateMachine;
    // Start is called before the first frame update
    void Start()
    {
        modeStateMachine = new StateMachine();
        modeStateMachine.Initialize(new StateFreeEdition(modeStateMachine));
    }

    // Update is called once per frame
    void Update()
    {
        GameObject.Find("CanvasHUD").transform.GetChild(0).GetComponent<TextMeshProUGUI>().text = modeStateMachine.currentState.ToString(); 
        modeStateMachine.currentState.HandleInput();
        modeStateMachine.currentState.LogicUpdate();
    }

    //Change the object to invoke when performing a palm up gesture with the appropriate hand (cube, tooltip, cylinder of virtual object or direction)
    public void changeInvokeObject(string objectName)
    {
        modeStateMachine.objectToInvoke = objectName;
        modeStateMachine.ChangeState(new StateFreeEdition(modeStateMachine));
    }
}
