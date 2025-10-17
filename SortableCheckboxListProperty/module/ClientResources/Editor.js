define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/SortableCheckboxList.html",
    "dojo/dnd/Source",
    "dojo/_base/lang",
    "dojo/when",
    "epi/dependency"
], function (
    declare,
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    template,
    Source,
    lang,
    when,
) {
    return declare("Editor", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _initialized: false, // Flag to ensure our setup logic only runs once.

        // This method is automatically called by the Dojo framework when widget.set("value", ...)
        // is executed by the Episerver editor framework. This happens late in the loading process.
        _setValueAttr: function (value) {
            // First, call the base implementation to actually set the value.
            this._set("value", value);

            // If we haven't run our initialization logic yet, run it now.
            if (!this._initialized) {
                this._initialized = true;
                this._initialize();
            }
        },

        // All our setup logic now lives here.
        _initialize: function () {
            when(this.selections, lang.hitch(this, function (items) {
                if (items) {
                    this._setupDnd(items);
                }
            }));
        },

        _setupDnd: function (items) {
            var source = new Source(this.dndSourceNode, {
                accept: [],
                creator: lang.hitch(this, this._createItem)
            });

            var initialItems = [];
            // Use the current value of the widget to build the initial list.
            var currentValue = this.get("value");
            if (currentValue) {
                initialItems = currentValue.map(function (val) {
                    return items.find(function (item) { return item.value === val; });
                }).filter(function (item) { return item; });
            }

            items.forEach(function (item) {
                if (!initialItems.some(function (initialItem) { return initialItem.value === item.value; })) {
                    initialItems.push(item);
                }
            });

            source.insertNodes(false, initialItems);
            source.on("DndDrop", lang.hitch(this, this._onDrop));
        },

        _createItem: function (item, hint) {
            var node = document.createElement("div");
            node.className = "sortable-checkbox-item dojoDndItem";
            node.setAttribute("style", "margin:2px");
            var uniqueId = this.id + '_' + item.value;
            node.innerHTML = '<div class="dojoDndHandle epi-iconDnD" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 5px; cursor: move;"></div><input type="checkbox" id="' + uniqueId + '" value="' + item.value + '"> <label for="' + uniqueId + '">' + item.text + '</label>';
            var checkbox = node.querySelector("input");

            var currentValue = this.get("value");
            if (currentValue && currentValue.indexOf(item.value) > -1) {
                checkbox.checked = true;
            }
            checkbox.addEventListener("change", lang.hitch(this, this._onChange));

            return { node: node, data: item, type: ["text"] };
        },

        _onChange: function () { setTimeout(lang.hitch(this, this._updateValue), 0); },
        _onDrop: function () { setTimeout(lang.hitch(this, this._updateValue), 0); },

        _updateValue: function () {
            var selectedValues = [];
            var nodes = this.dndSourceNode.childNodes;
            var nodeList = Array.from(nodes);
            for (var i = 0; i < nodes.length; i++) {
                var checkbox = nodes[i].querySelector("input[type='checkbox']");
                if (checkbox && checkbox.checked) {
                    selectedValues.push(checkbox.value);
                }
            }

            //resort checkbox items
            nodeList.sort((item1, item2) => {
                const a = item1.querySelector('input[type="checkbox"]');
                const b = item2.querySelector('input[type="checkbox"]');

                // If a is checked and b is not, a comes first.
                if (a.checked && !b.checked) {
                    return -1;
                }
                // If b is checked and a is not, b comes first.
                if (!a.checked && b.checked) {
                    return 1;
                }

                if (!a.checked && !b.checked) {
                    return a.value < b.value ? -1 : 1;
                }

                // Otherwise, maintain original order.
                return 0;
            });

            this.dndSourceNode.innerHTML = '';
            nodeList.forEach(item => this.dndSourceNode.appendChild(item));

            // Use _set to avoid a recursive loop with _setValueAttr
            this._set("value", selectedValues);
            // Notify the editor framework that the value has changed.
            this.onChange(selectedValues);
        }
    });
});