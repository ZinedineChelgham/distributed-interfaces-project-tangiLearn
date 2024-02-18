using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TowerManager : MonoBehaviour
{
    public GameObject cube1Prefab;
    public GameObject cube2Prefab;
    public GameObject cube3Prefab;
    public GameObject cube4Prefab;

    private GameObject cube1;
    private GameObject cube2;
    private GameObject cube3;
    private GameObject cube4;

    public int currentStage = 0;

    private float verticalPosition = 0f;

    public void addStage()
    {
        switch (currentStage)
        {
            case 0:
                cube1 = Instantiate(cube1Prefab, transform.position, Quaternion.identity);
                cube1.transform.SetParent(transform);
                cube1.transform.localScale = Vector3.one;
                currentStage++;
                break;
            case 1:
                verticalPosition += 0.125f;
                cube2 = Instantiate(cube2Prefab, transform.position + new Vector3(0, verticalPosition, 0), Quaternion.identity);
                cube2.transform.SetParent(transform);
                cube2.transform.localScale = Vector3.one;
                currentStage++;
                break;
            case 2:
                verticalPosition += 0.125f;
                cube3 = Instantiate(cube3Prefab, transform.position + new Vector3(0, verticalPosition, 0), Quaternion.identity);
                cube3.transform.SetParent(transform);
                cube3.transform.localScale = Vector3.one;
                currentStage++;
                break;
            case 3:
                verticalPosition += 0.125f;
                cube4 = Instantiate(cube4Prefab, transform.position + new Vector3(0, verticalPosition, 0), Quaternion.identity);
                cube4.transform.SetParent(transform);
                cube4.transform.localScale = Vector3.one;
                currentStage++;
                break;
            case 4:
                break;
        }
    }

    public void destroyStage()
    {
        switch (currentStage)
        {
            case 0:
                break;
            case 1:
                Destroy(cube1);
                //verticalPosition -= 0.125f;
                currentStage--;
                break;
            case 2:
                Destroy(cube2);
                verticalPosition -= 0.125f;
                currentStage--;
                break;
            case 3:
                Destroy(cube3);
                verticalPosition -= 0.125f;
                currentStage--;
                break;
            case 4:
                Destroy(cube4);
                verticalPosition -= 0.125f;
                currentStage--;
                break;
        }
    }
}
