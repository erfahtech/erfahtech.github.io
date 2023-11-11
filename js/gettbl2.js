import { addInner } from "https://jscroot.github.io/element/croot.js";

export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-getdevices";



export const tableDevice = `
<tr data-index="0">
<td>
    <div class="flex items-center justify-center">
        <input type="checkbox" name="check_a"
            class="checked-item w-[18px] h-[18px] accent-primary-600 hover:accent-primary-600 dark:accent-primary-200 rounded-[2px] cursor-pointer">
    </div>
</td>
<td>
    <div class="flex items-center gap-3">
        <div class="flex flex-col">
            <h4 class="font-semibold">#NAME#.</h4>
        </div>
    </div>
</td>
<td>
    <span
        class="inline-flex items-center h-6 px-3 text-label-md text-pink-700 dark:text-pink-200 bg-pink-100 dark:bg-opacity-20 rounded-full">
        #TOPIC#
    </span>
</td>
<td class="whitespace-nowrap px-6 bg-white text-sm font-medium text-coolGray-800 text-center">
<button class="edit-button">
        <span class="material-symbols-outlined">
        edit
        </span>
    </button>
    <button type="button" id="del_button" onclick="deleteDevice('#IDHAPUS#')" title="Delete" class="delete-button">
        <span class="material-symbols-outlined">
        delete
        </span>
    </button>
</td>

</tr>
`;

export function responseData(results) {
    console.log(results);
    results.data.forEach(isiTable);
}

export function isiTable(value) {
    const content =
        tableDevice.replace("#TOPIC#", value.topic)
            .replace("#NAME#", value.name)
            .replace("#IDHAPUS#", value.id);
    addInner("device", content);

    const selectall = document.querySelector("#checkall");
    const hidden_act = document.querySelector('#hidden-act');

    if (selectall != null) {
        selectall.addEventListener("click", function () {
            let ele = document.querySelectorAll('.checked-item');

            if (selectall.checked == true) {
                for (var i = 0; i < ele.length; i++) {
                    if (ele[i].type == 'checkbox')
                        ele[i].checked = true;
                    hidden_act.classList.add("show");
                    ele[i].parentNode.parentNode.parentNode.classList.add("selected");
                }
            } else {
                for (var i = 0; i < ele.length; i++) {
                    if (ele[i].type == 'checkbox')
                        ele[i].checked = false;
                    hidden_act.classList.remove("show");
                    ele[i].parentNode.parentNode.parentNode.classList.remove("selected");
                }
            }
        });

        // if checked item
        let elem = document.querySelectorAll('.checked-item');
        // Process loop items
        function processLoopItems(items) {
            for (let i = 0; i < items.length; i++) {
                items[i].addEventListener("click", function () {
                    items[i].parentNode.parentNode.parentNode.classList.remove("selected");
                    // uncheck all checkbox
                    const empty = [].filter.call(items, function (el) {
                        return !el.checked
                    });
                    if (items.length == empty.length) {
                        hidden_act.classList.remove("show");
                        return false;
                    } else if (items.length > empty.length) {
                        hidden_act.classList.add("show");
                    }
                    if (this.checked == true) {
                        items[i].parentNode.parentNode.parentNode.classList.add("selected");
                    }
                });
            }
        }
        // Call
        const initialLoopItems = document.querySelectorAll(".checked-item");
        processLoopItems(initialLoopItems);
        window.addEventListener("click", function () {
            // Recalculate
            const updatedLoopItems = document.querySelectorAll(".checked-item");

            // updated loop items
            processLoopItems(updatedLoopItems);
        });
    }

}
