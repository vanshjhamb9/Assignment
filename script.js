// mealPlanGenerator.js

function validateForm() {
    var numberOfMeals = document.getElementById('numberOfMeals').value;
    var dietPreference = document.getElementById('dietPreference').value;
    var healthSpecification = document.getElementById('healthSpecification').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var mealType = document.getElementById('mealType').value;

    // Basic validation
    if (!numberOfMeals || !dietPreference || !healthSpecification || !height || !weight || !age || !gender || !mealType) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Additional validation for age, height, and weight
    if (isNaN(age) || age <= 0 || age > 150) {
        alert('Please enter a valid age.');
        return false;
    }

    if (isNaN(height) || height <= 0 || height > 300) {
        alert('Please enter a valid height.');
        return false;
    }

    if (isNaN(weight) || weight <= 0 || weight > 500) {
        alert('Please enter a valid weight.');
        return false;
    }

    return true;
}

function generateMealPlan() {
    if (!validateForm()) {
        return; // Stop execution if form is not valid
    }

    var loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader

    // Get user input values
    var numberOfMeals = document.getElementById('numberOfMeals').value;
    var dietPreference = document.getElementById('dietPreference').value;
    var healthSpecification = document.getElementById('healthSpecification').value;

    // Use the Edamam API to retrieve recipe information based on user inputs
    var edamamApiUrl = 'https://api.edamam.com/search';
    var appId = '22d6015e'; // Replace with your Edamam API credentials
    var appKey = 'e3a06155aa9aac3ebbd2740605c818b0';

    // Construct the API request URL
    var apiUrl =
        `${edamamApiUrl}?q=&app_id=${appId}&app_key=${appKey}` +
        `&diet=${dietPreference}&health=${healthSpecification}`;

    // Make an API request (you may want to use a more sophisticated method like fetch or axios)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the response JSON
            var response = JSON.parse(xhr.responseText);

            // Call a function to display the meal plan on the page
            displayMealPlan(response.hits, numberOfMeals);
        }
    };
    xhr.send();

    setTimeout(function () {
        loader.style.display = 'none';

        // Rest of your code to generate and display meal plan

        setTimeout(function () {
            promptForReview();

            displayUserSuggestion();
        }, 7000);
    }, 2000);
}


function displayUserSuggestion() {
    // Get user input values
    var height = parseInt(document.getElementById('height').value);
    var weight = parseInt(document.getElementById('weight').value);
    var age = parseInt(document.getElementById('age').value);
    var gender = document.getElementById('gender').value;
    var mealType = document.getElementById('mealType').value;
    var dietaryRestrictions = document.getElementById('dietaryRestrictions').value;

    // Your logic to generate personalized suggestions based on user details
    var suggestion = "Here's a personalized suggestion for you:\n";

    // Example: Suggesting a workout based on age and gender
    if (age > 30 && gender === 'male') {
        suggestion += "Consider including cardio exercises in your routine to maintain heart health.";
    } else if (age > 30 && gender === 'female') {
        suggestion += "Incorporate strength training exercises to support bone health.";
    }

    // Display the suggestion in an alert or any other way you prefer
    alert(suggestion);
}
  function promptForReview() {
    var review = confirm("Enjoyed your meal plan? Would you like to leave a review?");
    if (review) {
        alert("Thank you for your feedback!");
        // You can implement logic to handle the review submission here
    } else {
        alert("We appreciate your time. Feel free to leave a review anytime!");
    }
}
  
  function displayMealPlan(recipeHits, numberOfMeals) {
    // Create a table to display the meal plan
    var table = '<table border="1">';
    table += '<tr><th>Weekdays</th>';
  
    // Display the weekdays as headings
    for (var i = 1; i <= numberOfMeals; i++) {
      table += `<th>Meal ${i}</th>`;
    }
  
    table += '</tr>';
  
    // Display the recipe information
    for (var j = 0; j < recipeHits.length; j++) {
      table += `<tr><td>${recipeHits[j].recipe.label}</td>`;
  
      // Display the meal names, recipe images, and ingredients
      for (var k = 0; k < numberOfMeals; k++) {
        var meal = recipeHits[k];
  
        // Check if there are enough recipes
        if (meal) {
          table += '<td>';
          table += `<p>${meal.recipe.label}</p>`;
          table += `<img src="${meal.recipe.image}" alt="${meal.recipe.label}" width="100" height="100">`;
          table += '<ul>';
  
          // Display ingredients
          for (var l = 0; l < meal.recipe.ingredientLines.length; l++) {
            table += `<li>${meal.recipe.ingredientLines[l]}</li>`;
          }
  
          table += '</ul>';
          table += '</td>';
        } else {
          table += '<td>No recipe available</td>';
        }
      }
  
      table += '</tr>';
    }
  
    table += '</table>';
  
    // Display the table on the page
    document.getElementById('mealPlanTable').innerHTML = table;
  }
  function displaySuggestionCard(suggestion) {
    var card = document.querySelector('.suggestion-card');
    var content = document.querySelector('.suggestion-content');

    // Clear previous content
    content.innerHTML = '';

    // Create an unordered list for the suggestions
    var ul = document.createElement('ul');

    // Split the suggestion into an array of items
    var suggestionItems = suggestion.split('\n');

    // Populate the list with suggestions
    suggestionItems.forEach(function (item) {
        if (item.trim() !== '') {
            var li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        }
    });

    // Append the list to the card content
    content.appendChild(ul);

    // Create a close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'suggestion-close-button';
    closeButton.addEventListener('click', closeSuggestionCard);

    // Append the close button to the card content
    content.appendChild(closeButton);

    // Show and animate the card
    card.classList.add('active');
}

function closeSuggestionCard() {
    var suggestionCard = document.querySelector('.suggestion-card');
    suggestionCard.classList.remove('active');
}



// Modify your displayUserSuggestion function to use the new card component
function displayUserSuggestion() {
    // Get user input values
    var height = parseInt(document.getElementById('height').value);
    var weight = parseInt(document.getElementById('weight').value);
    var age = parseInt(document.getElementById('age').value);
    var gender = document.getElementById('gender').value;
    var mealType = document.getElementById('mealType').value;
    var dietaryRestrictions = document.getElementById('dietaryRestrictions').value;

    // Your logic to generate personalized suggestions based on user details
    var suggestion = "Here's a personalized suggestion for you:\n";

    // Example: Suggesting a workout based on age and gender
    if (age > 30 && gender === 'male') {
        suggestion += "Consider including cardio exercises in your routine to maintain heart health.";
    } else if (age > 30 && gender === 'female') {
        suggestion += "Incorporate strength training exercises to support bone health.";
    }

    if (age <= 12) {
        suggestion += "For children, it's crucial to have a well-balanced diet rich in nutrients for growth and development.";
    }else if (age >= 13 && age <= 24) {
        suggestion += "For Gen Z individuals, focus on a diverse diet that includes a variety of nutrient-rich foods.";
    }



    // Suggesting based on dietary preferences
    if (dietaryRestrictions.toLowerCase().includes('vegan')) {
        suggestion += "\nExplore plant-based protein sources like beans, lentils, and tofu.";
    }else if (dietaryRestrictions.toLowerCase().includes('peanut-free')) {
        suggestion += "\nEnsure snacks and meals are peanut-free to accommodate dietary preferences.";
    }else if (dietaryRestrictions.toLowerCase().includes('gluten-free')) {
        suggestion += "\nExplore gluten-free alternatives for a diverse and inclusive diet.";
    }




    // Suggesting based on meal type
    if (mealType.toLowerCase() === 'breakfast') {
        suggestion += "\nInclude a mix of proteins and carbohydrates for a balanced breakfast.";
    } else if (mealType.toLowerCase() === 'lunch') {
        suggestion += "\nPrioritize vegetables and lean proteins for a satisfying lunch.";
    } else if (mealType.toLowerCase() === 'dinner') {
        suggestion += "\nOpt for a lighter dinner with more emphasis on vegetables and proteins.";
    }

    // Display the suggestion in the new card component
    displaySuggestionCard(suggestion);
}
  