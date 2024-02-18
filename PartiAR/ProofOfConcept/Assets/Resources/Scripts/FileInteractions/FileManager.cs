using System;
using System.IO;
using UnityEngine;
using System.Collections;
using UnityEngine.Video;
using UnityEditor;
using UnityEngine.XR.WSA;
using UnityEngine.UI;

public static class FileManager
{
    public static string saveDirectory = Application.persistentDataPath + "/Saves/";
    public static string textDirectory = Application.persistentDataPath + "/Saves/Text/";
    public static string videoDirectory = Application.persistentDataPath + "/Saves/Video/";
    public static string photoDirectory = Application.persistentDataPath + "/Saves/Photo/";
    public static string audioDirectory = Application.persistentDataPath + "/Saves/Audio/";

    public static int fileNumberText = 0;
    public static int fileNumberVideo = 0;
    public static int fileNumberPhoto = 0;
    public static int fileNumberAudio = 0;

    public static void initFileManager()
    {
        fileNumberText = GetHighestFileNumber(RetrieveTextFiles(), ".txt");
        fileNumberVideo = GetHighestFileNumber(RetrieveVideoFiles(), ".mp4");
        fileNumberPhoto = GetHighestFileNumber(RetrievePhotoFiles(), ".jpg", ".png", ".jpeg");
        fileNumberAudio = GetHighestFileNumber(RetrieveAudioFiles(), ".wav", ".mp3");
    }

    private static int GetHighestFileNumber(string[] files, params string[] extensions)
    {
        int highestFileNumber = 0;

        foreach (string file in files)
        {
            string fileName = Path.GetFileNameWithoutExtension(file);

            foreach (string ext in extensions)
            {
                fileName = fileName.Replace(ext, "");
            }

            int startPos = fileName.IndexOfAny("0123456789".ToCharArray());
            if (startPos != -1)
            {
                string numberStr = fileName.Substring(startPos);
                if (int.TryParse(numberStr, out int fileNumber))
                {
                    highestFileNumber = Math.Max(highestFileNumber, fileNumber);
                }
            }
        }

        return highestFileNumber + 1;
    }
    //pour Mia : C:\Users\BUNICE\AppData\LocalLow\DefaultCompany\ProofOfConcept\Saves

    public static string[] RetrieveSaveFiles()
    {
        if(Directory.Exists(saveDirectory))
            return Directory.GetFiles(saveDirectory);
        return new string[] {};
    }

    public static string[] RetrieveTextFiles()
    {
        if(Directory.Exists(textDirectory)){
            return Directory.GetFiles(textDirectory, "*.txt");
        }
        return new string[] {};
    }

    public static string[] RetrieveVideoFiles()
    {
        if(Directory.Exists(videoDirectory)){
            return Directory.GetFiles(videoDirectory, "*.mp4");
        }
        return new string[] {};
    }

    public static string[] RetrievePhotoFiles()
    {
        if(Directory.Exists(photoDirectory)){
            string[] filesEntriesPhotoJpg = Directory.GetFiles(photoDirectory, "*.jpg");
            string[] filesEntriesPhotoPng = Directory.GetFiles(photoDirectory, "*.png");
            string[] filesEntriesPhotoJpeg = Directory.GetFiles(photoDirectory, "*.jpeg");
            string[] filesEntriesPhoto = new string[filesEntriesPhotoJpg.Length + filesEntriesPhotoPng.Length + filesEntriesPhotoJpeg.Length];
            filesEntriesPhotoJpg.CopyTo(filesEntriesPhoto, 0);
            filesEntriesPhotoPng.CopyTo(filesEntriesPhoto, filesEntriesPhotoJpg.Length);
            filesEntriesPhotoJpeg.CopyTo(filesEntriesPhoto, filesEntriesPhotoJpg.Length + filesEntriesPhotoPng.Length);
            return filesEntriesPhoto;
        }
        return new string[] {};
    }

    public static string[] RetrieveAudioFiles()
    {
        if(Directory.Exists(audioDirectory)){
            string[] filesEntriesAudioWav = Directory.GetFiles(audioDirectory, "*.wav");
            string[] filesEntriesAudioMp3 = Directory.GetFiles(audioDirectory, "*.mp3");
            string[] filesEntriesAudio = new string[filesEntriesAudioWav.Length + filesEntriesAudioMp3.Length];
            filesEntriesAudioWav.CopyTo(filesEntriesAudio, 0);
            filesEntriesAudioMp3.CopyTo(filesEntriesAudio, filesEntriesAudioWav.Length);
            return filesEntriesAudio;
        }
        return new string[] {};
    }

    public static void createSaveDirectory()
    {
        Directory.CreateDirectory(saveDirectory);
        Directory.CreateDirectory(textDirectory);
        Directory.CreateDirectory(audioDirectory);
        Directory.CreateDirectory(videoDirectory);
        Directory.CreateDirectory(photoDirectory);
    }

    public static bool WriteToFile(string a_FileName, string a_FileContents)
    {
        var fullPath = Path.Combine(saveDirectory, a_FileName);

        //if (Array.Exists(RetrieveTextFiles(), element => element == fullPath)) {
            try
            {
                File.WriteAllText(fullPath, a_FileContents);
                Debug.Log("Successfully wrote in " + fullPath);
                return true;
            }
            catch (Exception e)
            {
                Debug.LogError($"Failed to write to {fullPath} with exception {e}");
                return false;
            }
        /*} else
        {
            throw new SameNameException();
        }*/
    }


    public static bool WriteToFile(string a_FileName, string a_FileContents, SceneObject SO)
    {
        var fullPath = Path.Combine(textDirectory, a_FileName);

        if (!Array.Exists(RetrieveTextFiles(), element => element == fullPath)) {

            try
            {
                Debug.Log(1);
                File.WriteAllText(fullPath, a_FileContents);
                Debug.Log(2);
                SO.AddToPathList(fullPath);
                Debug.Log("Successfully wrote in " + fullPath);
                return true;
            }
            catch (Exception e)
            {
                Debug.LogError($"Failed to write to {fullPath} with exception {e}");
                return false;
            }
        } else
        {
            File.WriteAllText(fullPath, a_FileContents);
            SO.AddToPathList(fullPath);
            Debug.Log("Successfully wrote in " + fullPath);
            return true;
            //throw new SameNameException();
        }
    }

    public static bool WriteToFile(string a_FileName, byte[] a_FileContents, SceneObject SO, bool replaceFileIfExist = false)
    {
        var fullPath = Path.Combine(saveDirectory, a_FileName);
        Debug.Log(fullPath);

        if (  replaceFileIfExist || (!Array.Exists(RetrievePhotoFiles(), element => element == fullPath) && (fullPath.Contains("/Photo/")) )
            || (!Array.Exists(RetrieveAudioFiles(), element => element == fullPath) && (fullPath.Contains("/Audio/")) )
            )
        {

            try
            {
                File.WriteAllBytes(fullPath, a_FileContents);
                if (SO != null)
                {
                    SO.AddToPathList(fullPath);
                }
                Debug.Log("Successfully wrote in " + fullPath);
                return true;
            }
            catch (Exception e)
            {
                Debug.LogError($"Failed to write to {fullPath} with exception {e}");
                return false;
            }
        } else
        {
            throw new SameNameException();
        }
    }


    public static bool LoadFromFile(string a_FileName, out string result)
    {
        var fullPath = Path.Combine(saveDirectory, a_FileName);
        
        try
        {
            result = File.ReadAllText(fullPath);
            Debug.Log("Successfully opened " + fullPath);
            return true;
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to read from {fullPath} with exception {e}");
            result = "";
            return false;
        }
        
        
    }

    public static bool LoadFromFileBytes(string a_FileName, out byte[] result)
    {
        var fullPath = Path.Combine(saveDirectory, a_FileName);

        try
        {
            result = File.ReadAllBytes(fullPath);
            Debug.Log("Successfully opened " + fullPath);
            return true;
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to read from {fullPath} with exception {e}");
            result = null;
            return false;
        }
    }

    public static void LoadAndPlayVideo(string filename, VideoPlayer videoPlayer)
    {
        // Get the path to the persistent data location
         var path = Path.Combine(videoDirectory, filename);

        //Check if the file is empty
        using (var fileStream = File.OpenRead(path))
        {
            if (fileStream.Length == 0)
            {
                Debug.LogError("File is empty");
            }
        }

        // Load the video file
        videoPlayer.url = path;

        // Play the video
        Debug.Log("Video Played");
        videoPlayer.Play();
        Debug.Log("Video Stopped");

    }

    public static void LoadVideo(string filename, VideoPlayer videoPlayer)
    {
        // Get the path to the persistent data location
         var path = Path.Combine(saveDirectory, filename);


        //Check if the file is empty
        using (var fileStream = File.OpenRead(path))
        {
            if (fileStream.Length == 0)
            {
                Debug.LogError("File is empty");
            }
        }

        // Load the video file
        videoPlayer.url = path;

    }

    public static void LoadPhoto(string filename, SpriteRenderer spriteRenderer){

        // Get the path to the persistent data location
        var path = Path.Combine(saveDirectory, filename);

        byte[] result;

        try
        {
            result = File.ReadAllBytes(path);
            Debug.Log("Successfully opened " + path);
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to read from {path} with exception {e}");
            result = null;
        }

        Texture2D texture = new Texture2D(2, 2);
        bool loaded = texture.LoadImage(result);
        
        Sprite photoSprite = Sprite.Create(texture, new Rect(0, 0, texture.width, texture.height), new Vector2(0.5f, 0.5f));
        spriteRenderer.sprite = photoSprite;
    }

    public static void loadPhotoIntoRawImage(RawImage rawImage, string pathPhoto)
    {
        // Get the path to the persistent data location
        var path = Path.Combine(Application.persistentDataPath + "/Saves/Photo/", pathPhoto);
        byte[] result;
        try
        {
            result = File.ReadAllBytes(path);
            Debug.Log("Successfully opened " + path);
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to read from {path} with exception {e}");
            result = null;
        }
        Texture2D texture = new Texture2D(100, 100);
        texture.LoadImage(result);
        rawImage.texture = texture;
    }
    public static void TakeScreenshot(string pathPhoto)
    {
        // Get the dimensions of the screen
        Vector2Int dimensions = new Vector2Int(Display.main.renderingWidth, Display.main.renderingHeight);

        // Create a texture to store the screenshot
        Texture2D texture = new Texture2D(dimensions.x, dimensions.y, TextureFormat.RGBA32, false);

        // Read the pixels from the screen into the texture
        texture.ReadPixels(new Rect(0, 0, dimensions.x, dimensions.y), 0, 0);
        texture.Apply();

        // Save the texture as a PNG file
        byte[] bytes = texture.EncodeToPNG();
        WriteToFile("Photo/" + pathPhoto, bytes, null, true);
    }

    public static void DeletePhoto(string pathPhoto)
    {

        var path = Path.Combine(Application.persistentDataPath + "/Saves/Photo/", pathPhoto);
        File.Delete(path);
    }    


}