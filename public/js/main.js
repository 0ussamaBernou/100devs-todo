const trashIcons = document.querySelectorAll(".fa-trash");
const deleteIcons = document.querySelectorAll(".fa-times-circle");

// for (let i = 0; i < trashIcons.length; i++) {
//   console.log(trashIcons[i]);
//   trashIcons[i].addEventListener("click", trash());
// }
Array.from(trashIcons).forEach((trashIcon) => {
    trashIcon.addEventListener("click", trash);

});
Array.from(deleteIcons).forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", deleteItem);

});

async function trash() {
    console.log("clicked");
    const itemText = this.parentNode.childNodes[1].innerText;
    try {
        const response = await fetch("trash", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "itemFromJs": itemText,
            }),
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.error(err);
    }
}

async function remove() {
    console.log("clicked");
    const itemText = this.parentNode.childNodes[1].innerText;
    try {

        const response = await fetch("deleteItem", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "itemFromJs": itemText,
            }),
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.error(err);
    }
}
async function deleteItem() {
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        console.log(itemText)
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'itemFromJS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }
}