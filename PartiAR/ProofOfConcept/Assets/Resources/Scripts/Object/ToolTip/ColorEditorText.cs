using UnityEngine;
using TMPro;

public class ColorEditorText : MonoBehaviour  
{
    public GameObject Red;
    public GameObject Green;
    public GameObject Blue;
    public TextMeshPro TMP;
    bool changeColorActive = false;

    // Update is called once per frame
    void Update()
    {
        if (changeColorActive)
        {
            TMP.color = new Color32((byte)int.Parse(Red.GetComponent<TextMeshPro>().text), (byte)int.Parse(Green.GetComponent<TextMeshPro>().text), (byte)int.Parse(Blue.GetComponent<TextMeshPro>().text), 255);
        }
    }

    public void ChangeColor(Color32 color32)
    {
        TMP.color = color32;
    }

    public Color32 GetColor()
    {
        return TMP.color;
    }

    public void SetChangeColorActive()
    {
        changeColorActive = true;
    }

    public void SetChangeColorInactive()
    {
        changeColorActive = false;
    }

    public string GetText()
    {
        return TMP.text;
    }
}
