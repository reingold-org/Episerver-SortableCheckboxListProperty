using System;

namespace Reingold.Episerver.SortableCheckboxListProperty
{
    [AttributeUsage(AttributeTargets.Property)]
    public class SortableCheckboxListSelectionFactoryAttribute : Attribute
    {
        public Type FactoryType { get; }

        public SortableCheckboxListSelectionFactoryAttribute(Type factoryType)
        {
            FactoryType = factoryType;
        }
    }
}
