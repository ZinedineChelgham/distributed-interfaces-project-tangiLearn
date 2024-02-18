using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ControlTowerWithSocket : MonoBehaviour
{

    //public GameObject toUpdate;
    //public int actionToDo = 0;

    public GameObject A1;
    public int UpdateA1=0;
    public int previousA1=0;
    public GameObject A2;
    public int UpdateA2=0;
    public int previousA2=0;
    public GameObject A3;
    public int UpdateA3=0;
    public int previousA3=0;
    public GameObject B1;
    public int UpdateB1=0;
    public int previousB1=0;
    public GameObject B2;
    public int UpdateB2=0;
    public int previousB2=0;
    public GameObject B3;
    public int UpdateB3=0;
    public int previousB3=0;
    public GameObject C1;
    public int UpdateC1=0;
    public int previousC1=0;
    public GameObject C2;
    public int UpdateC2=0;
    public int previousC2=0;
    public GameObject C3;
    public int UpdateC3=0;
    public int previousC3=0;

    [System.Serializable]
    public class Action
    {
        public int A1state;
        public int A2state;
        public int A3state;
        public int B1state;
        public int B2state;
        public int B3state;
        public int C1state;
        public int C2state;
        public int C3state;
        
    }
    // Update is called once per frame
    void Update()
    {
        /**
        if(actionToDo==1){
            toUpdate.GetComponent<TowerManager>().addStage();
            actionToDo = 0;
        }
        else if(actionToDo==-1){
            toUpdate.GetComponent<TowerManager>().destroyStage();
            actionToDo = 0;
        }**/
        previousA1=A1.GetComponent<TowerManager>().currentStage;
        previousA2=A2.GetComponent<TowerManager>().currentStage;
        previousA3=A3.GetComponent<TowerManager>().currentStage;
        previousB1=B1.GetComponent<TowerManager>().currentStage;
        previousB2=B2.GetComponent<TowerManager>().currentStage;
        previousB3=B3.GetComponent<TowerManager>().currentStage;
        previousC1=C1.GetComponent<TowerManager>().currentStage;
        previousC2=C2.GetComponent<TowerManager>().currentStage;
        previousC3=C3.GetComponent<TowerManager>().currentStage;

        Debug.Log("test "+A1.GetComponent<TowerManager>().currentStage);

        if(UpdateA1-previousA1!=0){
            CorrectTurret(A1,UpdateA1-previousA1);
            previousA1=UpdateA1;
        }
        if(UpdateA2-previousA2!=0){
            CorrectTurret(A2,UpdateA2-previousA2);
            previousA2=UpdateA2;
        }
        if(UpdateA3-previousA3!=0){
            CorrectTurret(A3,UpdateA3-previousA3);
            previousA3=UpdateA3;
        }
        if(UpdateB1-previousB1!=0){
            CorrectTurret(B1,UpdateB1-previousB1);
            previousB1=UpdateB1;
        }
        if(UpdateB2-previousB2!=0){
            CorrectTurret(B2,UpdateB2-previousB2);
            previousB2=UpdateB2;
        }
        if(UpdateB3-previousB3!=0){
            CorrectTurret(B3,UpdateB3-previousB3);
            previousB3=UpdateB3;
        }
        if(UpdateC1-previousC1!=0){
            CorrectTurret(C1,UpdateC1-previousC1);
            previousC1=UpdateC1;
        }
        if(UpdateC2-previousC2!=0){
            CorrectTurret(C2,UpdateC2-previousC2);
            previousC2=UpdateC2;
        }
        if(UpdateC3-previousC3!=0){
            CorrectTurret(C3,UpdateC3-previousC3);
            previousC3=UpdateC3;
        }

    }


     private void OnEnable()
    {
        // Enregistrez la fonction que vous souhaitez appeler lorsque le message est reçu
        WebSocketManager.OnMessageReceived += HandleMessageReceived;
    }

    private void OnDisable()
    {
        // Assurez-vous de désenregistrer la fonction lorsque le GameObject est désactivé ou détruit
        WebSocketManager.OnMessageReceived -= HandleMessageReceived;
    }

     // Fonction appelée lorsque le message est reçu
    private void HandleMessageReceived(string message)
    {
        // Appeler la fonction spécifique du Controller
        onAction(message);
    }

    // Fonction spécifique du Controller
    private void OnMessageReceivedInController(string message)
    {
        // Logique spécifique du Controller
    }

    public void onAction(string action){
        if(string.Equals(action,"Message received by the server")){
        }
        else{
            Action actionObject = JsonUtility.FromJson<Action>(action);
            Debug.Log(actionObject.A1state);
            Debug.Log(actionObject.A2state);
            Debug.Log(actionObject.A3state);
            
                //si ca marche pas ca , il faut juste tout stocker dans des variable ( ca peut ne pas marcher a cause du thread)
            UpdateA1 = actionObject.A1state;
            UpdateA2 = actionObject.A2state;
            UpdateA3 = actionObject.A3state;
            UpdateB1 = actionObject.B1state;
            UpdateB2 = actionObject.B2state;
            UpdateB3 = actionObject.B3state;
            UpdateC1 = actionObject.C1state;
            UpdateC2 = actionObject.C2state;
            UpdateC3 = actionObject.C3state;
            }
        

    }

    public void CorrectTurret(GameObject tower, int correction){
        if(correction>0){
            while(correction!=0){
                tower.GetComponent<TowerManager>().addStage();
                correction--;
            }
        }
        else{
            while(correction!=0){
                tower.GetComponent<TowerManager>().destroyStage();
                correction++;
            }
        }
    }
}
