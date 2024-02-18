using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using WebSocketSharp;
using System;

public class WebSocketManager : MonoBehaviour
{
    public WebSocket ws;

    public delegate void MessageReceivedEventHandler(string message);
    public static event MessageReceivedEventHandler OnMessageReceived;

    


    void Start()
    {
    
        //ws://172.20.10.8:8080/connection
        // Remplacez l'URL par l'adresse de votre serveur WebSocket
        ws = new WebSocket("ws://192.168.1.11:8080/connection");

        // Ignorer la vérification du certificat (à utiliser avec précaution)
        //ws.SslConfiguration.EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12;


        // Gestion des événements
        ws.OnOpen += OnOpen;
        ws.OnMessage += OnMessage;
        ws.OnError += OnError;
        ws.OnClose += OnClose;

        // Connexion au serveur WebSocket
        ws.Connect();
    }

    void OnOpen(object sender, System.EventArgs e)
    {
        Debug.Log("WebSocket ouvert");

    }

    void OnMessage(object sender, MessageEventArgs e)
    {
        try
        {
            string message = e.Data;

            // Appeler l'événement pour notifier les écouteurs
            OnMessageReceived?.Invoke(message);
        }
        catch (Exception ex)
        {
            Debug.LogError("Erreur pendant le traitement de l'événement OnMessage : " + ex.ToString());
        }
    
    }

    void OnError(object sender, ErrorEventArgs e)
    {
        Debug.LogError("Erreur WebSocket : " + e.Message);
    }

    void OnClose(object sender, CloseEventArgs e)
    {
        Debug.Log("WebSocket fermé avec le code : " + e.Code + ", raison : " + e.Reason);
    }

    void OnDestroy()
    {
        if (ws != null && ws.IsAlive)
            ws.Close();
    }
    

    
    
}
