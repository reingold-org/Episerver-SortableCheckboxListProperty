# Sortable CheckboxList Property for Episerver
Adds the option to have CheckboxList properties that are sortable by drag and drop.

# Installation
Install the package from nuget - Reingold.Episerver.SortableCheckboxListProperty

# Configuration
Configure Properties as follows:
```csharp
[SortableCheckboxListSelectionFactory(typeof(MySelectionFactory))]
[UIHint(SortableCheckboxListUIHint.UIHint)]
[BackingType(typeof(SortableCheckboxListProperty))]
public virtual IList<string> MyCheckboxList { get; set; }
```
# Usage
https://github.com/user-attachments/assets/0f79f2ae-b402-4b8a-bedc-3002917d1333



# Contributing
As this is an open-source project, we encourage you to contribute to the source code and the documentation. 

