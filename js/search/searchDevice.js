function searchDevice() {
    var input, filter, tableDevice, tr, td, i, j, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    tableDevice = document.getElementById("devices");
    tr = tableDevice.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        let found = false;
        for (j = 0; j < 2; j++) { // Melakukan pencarian untuk kolom 0 (Nama Device) dan 1 (Topic)
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break; // Jika ditemukan, keluar dari loop pencarian kolom
                }
            }
        }
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}
