using EPiServer.Shell.ObjectEditing;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Reingold.Episerver.SortableCheckboxListProperty
{
    [EditorDescriptorRegistration(TargetType = typeof(IList<string>), UIHint = SortableCheckboxListUIHint.UIHint)]
    public class SortableCheckboxListEditorDescriptor : EditorDescriptor
    {
        public SortableCheckboxListEditorDescriptor()
        {
            ClientEditingClass = "sortableCheckboxList/Editor";
        }

        public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
        {
            base.ModifyMetadata(metadata, attributes);
            var selectionFactoryAttribute = attributes.OfType<SortableCheckboxListSelectionFactoryAttribute>().FirstOrDefault();
            if (selectionFactoryAttribute != null)
            {
                SelectionFactoryType = selectionFactoryAttribute.FactoryType;
            }
        }
    }
}
