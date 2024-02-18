using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ToolTipObject : MonoBehaviour
{
    // Start is called before the first frame update

    private int my_id;
    private List<string> filepathList;

    void Start()
    {
        
    }

    
    public void setId(int id)
    {
        my_id = id;
    }

    public void addFile(string filepath)
    {
        filepathList.Add(filepath);
    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
