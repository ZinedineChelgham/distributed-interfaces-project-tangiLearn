using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SameNameException : Exception
{
    public SameNameException() : base("A file of the same type and same name already exists.")
    {
    }

    public SameNameException(string message) : base("The name : " + message+ "is already taken")
    {
    }

}
