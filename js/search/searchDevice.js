function searchDevice() {
    var input, filter, tableDevice, tr, td, i, j, txtValue;
    input = document.getElementById("searchDevice");
    filter = input.value;
    tableDevice = document.getElementById("devices");
    tr = tableDevice.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        let found = false;
        for (j = 0; j < 2; j++) { // Pencarian pada kolom 0 (Nama Device) dan 1 (Topic)
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
            if (i !== 0) {
                // Jika data ditemukan selain pada baris pertama, geser baris ke atas
                tableDevice.insertBefore(tr[i], tr[0]);
            }
            tr[i].style.display = ""; // Menampilkan baris yang cocok
        } else {
            tr[i].style.display = "none"; // Menyembunyikan baris yang tidak cocok
        }
    }
}
