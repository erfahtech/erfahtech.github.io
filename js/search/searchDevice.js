function searchDevice() {
    var input, filter, tableDevice, tr, td, i, j, txtValue;
    input = document.getElementById("searchDevice");
    filter = input.value.toUpperCase();
    tableDevice = document.getElementById("devices");
    tr = tableDevice.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        let found = false;
        for (j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            if (i !== 0) {
                tableDevice.insertBefore(tr[i], tr[0]);
            }
            tr[i].style.display = ""; // Show matching rows
        } else {
            tr[i].style.display = "none"; // Hide non-matching rows
        }
    }
}