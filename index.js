
    const img = document.getElementById('img');
    const version = 2;
    const alpha = 0.5;
    async function run_prediction() {
      // Load the model.
      const model = await mobilenet.load({ version, alpha });
      // Classify the image.
      const predictions = await model.classify(img);
      console.log('Predictions');
      console.log(predictions);
      let first_prediction = predictions[0].className;
      let first_prediction_pron = predictions[0].probability;
      console.log(first_prediction, first_prediction_pron)
      document.getElementById("prediction").innerHTML = first_prediction +"<br>propability: " +  Math.round(first_prediction_pron*100) + " %"
      // Get the logits.
      const logits = model.infer(img);
      console.log('Logits');
      logits.print(true);
      // Get the embedding.
      const embedding = model.infer(img, true);
      console.log('Embedding');
      embedding.print(true);
    }

    function previewFile() {
      var preview = document.querySelector('img'); //selects the query named img
      var file = document.querySelector('input[type=file]').files[0]; //sames as here
      var reader = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
        console.log('Image loaded')

        document.getElementById("prediction").innerHTML = "Predicting..."

        run_prediction();

      }

      if (file) {
        reader.readAsDataURL(file); //reads the data as a URL

      } else {
        preview.src = "";

      }
    }

    previewFile();  //calls the function named previewFile()