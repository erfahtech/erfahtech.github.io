function searchDevice() {
    var input, filter,tableDevice,tr1, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    tableDevice = document.getElementById("devices");
    tr1 = tableDevice.getElementsByTagName("tr");
    let p1 = 0;
    for (i = 0; i < tr1.length; i++) {
      td = tr1[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr1[i].style.display = "";
          p1 += 1;
        } else {
          tr1[i].style.display = "none";
        }
      }
    }
}