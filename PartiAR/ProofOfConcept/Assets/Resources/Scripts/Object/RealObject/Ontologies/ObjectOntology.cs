using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectOntology : MonoBehaviour
{
    public Dictionary<string, List<string>> ontologiesCategories = new Dictionary<string, List<string>>();
    public event EventHandler<OntologyChangedEventArgs> AddEvent;
    public event EventHandler<OntologyChangedEventArgs> RemoveEvent;

    public class OntologyChangedEventArgs : EventArgs
    {
        public string Key { get; }
        public string Value { get; }

        public OntologyChangedEventArgs(string key, string value)
        {
            Key = key;
            Value = value;
        }
    }

    private void Awake()
    {
        if (ontologiesCategories == null)
        {
            ontologiesCategories = new Dictionary<string, List<string>>();
        }
    }

    public void AddOntology(string key, string value)
    {
        if (ontologiesCategories.ContainsKey(key))
        {
            if (!ontologiesCategories[key].Contains(value))
            {
                ontologiesCategories[key].Add(value);
                AddEvent?.Invoke(this, new OntologyChangedEventArgs(key, value));
            }
        }
        else
        {
            ontologiesCategories[key] = new List<string>() { value };
            AddEvent?.Invoke(this, new OntologyChangedEventArgs(key, value));
        }
    }

    public void RemoveCategory(string key, string value)
    {
        if (ontologiesCategories.ContainsKey(key))
        {
            ontologiesCategories[key].Remove(value);
            if (ontologiesCategories[key].Count == 0)
            {
                ontologiesCategories.Remove(key);
            }
            RemoveEvent?.Invoke(this, new OntologyChangedEventArgs(key, value));
        }
    }
}