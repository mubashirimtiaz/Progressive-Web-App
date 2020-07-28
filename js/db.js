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
      console.log("removed");
    }
  });
});

//deleting recipe from db
