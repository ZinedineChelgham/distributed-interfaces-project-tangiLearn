using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class AudioUtils
{
    public static void PlayAudioFromTime(string audioFileName, float startTime, AudioSource audioSource)
    {
        AudioClip audioClip = Resources.Load<AudioClip>("Audio/" + audioFileName);
        if (audioClip != null)
        {
            audioSource.clip = audioClip;
            audioSource.time = startTime;
            audioSource.Play();
        }
        else
        {
            Debug.LogError("Audio clip not found.");
        }
    }

    public static void PlayAudioFromTime(AudioClip audioClip, float startTime, AudioSource audioSource)
    {
        if (audioClip != null)
        {
            audioSource.clip = audioClip;
            audioSource.time = startTime;
            audioSource.Play();
        }
        else
        {
            Debug.LogError("Audio clip not found.");
        }
    }
}
