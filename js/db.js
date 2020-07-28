//offline data
db.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("persistence failed");
  } else if (err.code === "unimplemented") {
    console.log("persistence is not supported");
  }
});

// real time listener
db.collection("recipes").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      deleteRecipe(change.doc.id);
    }
  });
});

//deleting recipe from db

const recipesContainer = document.querySelector(".recipes");
recipesContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});
