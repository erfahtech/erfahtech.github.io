const postDevices = () => {
    const nama = document.getElementById("isiName").value;
    let topic = document.getElementById("isiTopic").value.toLowerCase(); // Convert to lowercase
    const loadingElement = document.getElementById("loading");
    const diabuttonElement = document.getElementById("diabutton");
    const email = localStorage.getItem("userEmail");

    diabuttonElement.style.display = "none";
    loadingElement.style.display = "block";

    if (nama === "" || topic === "") {
        Swal.fire({
            icon: "error",
            title: "Gagal Menambahkan Device",
            text: "Please fill in all fields.",
        });

        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
        return;
    }

    // Validate topic
    const topicRegex = /^[a-z]+$/; // Only lowercase letters
    if (!topicRegex.test(topic)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Topic",
            text: "Topic harus menggunakan huruf kecil dan tidak menggunakan angka.",
        });

        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
        return;
    }

    const target_url = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-insertdevices";
    const datainjson = {
        name: nama,
        topic: "urse/" + email + "/" + topic,
    };

    postWithBearer(target_url, getCookie("token"), datainjson, (result) => {
        responseData(result);
        loadingElement.style.display = "none";
        diabuttonElement.style.display = "flex";
    });
};
