using UnityEngine;

public class SaveInteractions : MonoBehaviour
{
   // bool active =false;
    // Start is called before the first frame update
    void Start()
    {
        gameObject.SetActive(false);
    }

    public void ToggleFileMenu(){
        //Utilis� pour le load et save multiple ajouter aussi FileManagementMenu.SetActive dans le Pressed button
        /*if (gameObject.activeSelf)
        {
            gameObject.SetActive(false);
        }
        else
        {
            gameObject.SetActive(true);
        }*/
        //Debug.Log(name + " File Menu is active " + gameObject.activeSelf);
    }
}
