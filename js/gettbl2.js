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
<td>
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
                .replace("#IDHAPUS#", value.user);
    addInner("device", content);

    const checkbox = document.querySelector('input[name="check_a"]');

    // Dapatkan elemen hidden-action
    const hiddenAction = document.getElementById('hidden-act');

    // Tambahkan event listener untuk perubahan pada kotak centang
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            // Jika kotak centang aktif, tampilkan hidden action
            hiddenAction.classList.add('show');
        } else {
            // Jika kotak centang tidak aktif, sembunyikan hidden action
            hiddenAction.classList.remove('show');
        }
    });

}
