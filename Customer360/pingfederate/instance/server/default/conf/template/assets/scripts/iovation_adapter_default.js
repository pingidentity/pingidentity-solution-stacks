var sent = false;

function submitForm() {
    if (!sent) {
        var form = document.getElementById('bb_form');
        if (form) {
            sent = true;
            form.submit();
        }
    }
}

window.io_global_object_name = "IGLOO";
window.IGLOO = window.IGLOO || {
    "enable_flash": false,
    "bbout_element_id": "bb_input",
    "loader": {
        "uri_hook": "/iojs",
        "subkey": "xz1wcI_mlev7ZyvfJj94rYhbKk9av1rsH3sDg5_JGsQ",
        "version": "general5"
    },
    "bb_callback": function (bb, complete) {
        var bb_field = document.getElementById("bb_input");

        if (bb_field) {
            bb_field.value = bb;
        }

        if (complete) {
            submitForm();
        }
    }
};