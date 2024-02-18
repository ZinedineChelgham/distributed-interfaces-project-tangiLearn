using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class PingServer : MonoBehaviour
{

    public int column;
    public int row; 
    public int action;
    // Start is called before the first frame update

    public GameObject webSocketManagerObject;

    private WebSocketManager webSocketManager;

    void Start()
    {
        webSocketManagerObject = GameObject.Find("WebSocket");
        webSocketManager = webSocketManagerObject.GetComponent<WebSocketManager>();
    }
    
    public void onAction(){
        webSocketManager.ws.Send("column:"+column+"; row:"+row+"; action:"+action);
    }
}
