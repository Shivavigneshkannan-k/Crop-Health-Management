let users = [];

document.getElementById('sign-in-button').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        document.querySelector('.sign-in-page').classList.add('hidden');
        document.querySelector('.health-monitoring-page').classList.remove('hidden');
    } else {
        document.getElementById('sign-in-error').classList.remove('hidden');
    }
});

document.getElementById('sign-up-button').addEventListener('click', function() {
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('sign-up-error').classList.remove('hidden');
    } else {
        users.push({ email: email, password: password });
        document.querySelector('.sign-up-page').classList.add('hidden');
        document.querySelector('.sign-in-page').classList.remove('hidden');
        document.getElementById('sign-up-error').classList.add('hidden');
    }
});

document.getElementById('go-to-sign-up').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.sign-in-page').classList.add('hidden');
    document.querySelector('.sign-up-page').classList.remove('hidden');
    document.getElementById('sign-in-error').classList.add('hidden');
});

document.getElementById('go-to-sign-in').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.sign-up-page').classList.add('hidden');
    document.querySelector('.sign-in-page').classList.remove('hidden');
    document.getElementById('sign-up-error').classList.add('hidden');
});

document.getElementById('submit-button').addEventListener('click', function() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    const humidity = parseFloat(document.getElementById('humidity').value);
    const result = document.getElementById('result');
    const recommendations = document.getElementById('recommendations');

    let isHealthy = true;
    let recommendationsText = '';

    if (temperature > 25) {
        isHealthy = false;
        recommendationsText += '<strong>High Temperature (> 25°C / 77°F)</strong><br>';
        recommendationsText += 'Problem: High temperatures can cause heat stress, flower drop, and fruit sunscald.<br>';
        recommendationsText += 'Recommendations:<br>';
        recommendationsText += '1. Increase shading using shade cloths.<br>';
        recommendationsText += '2. Ensure adequate watering to prevent dehydration.<br>';
        recommendationsText += '3. Mulch the soil to retain moisture and regulate soil temperature.<br>';
    } else if (temperature < 18) {
        isHealthy = false;
        recommendationsText += '<strong>Low Temperature (< 18°C / 65°F)</strong><br>';
        recommendationsText += 'Problem: Low temperatures can slow growth, delay flowering, and increase susceptibility to diseases.<br>';
        recommendationsText += 'Recommendations:<br>';
        recommendationsText += '1. Use row covers or cloches to protect plants from cold.<br>';
        recommendationsText += '2. Ensure proper spacing to improve air circulation and prevent fungal diseases.<br>';
        recommendationsText += '3. Delay planting until the risk of frost has passed.<br>';
    }

    if (humidity > 70) {
        isHealthy = false;
        recommendationsText += '<strong>High Humidity (> 70%)</strong><br>';
        recommendationsText += 'Problem: High humidity can increase the risk of fungal diseases like blight and mildew.<br>';
        recommendationsText += 'Recommendations:<br>';
        recommendationsText += '1. Improve air circulation by spacing plants adequately.<br>';
        recommendationsText += '2. Avoid overhead watering; use drip irrigation instead.<br>';
        recommendationsText += '3. Remove affected plant parts promptly to prevent disease spread.<br>';
    } else if (humidity < 60) {
        isHealthy = false;
        recommendationsText += '<strong>Low Humidity (< 60%)</strong><br>';
        recommendationsText += 'Problem: Low humidity can cause water stress, leading to wilting and poor fruit set.<br>';
        recommendationsText += 'Recommendations:<br>';
        recommendationsText += '1. Increase watering frequency and consider using a misting system.<br>';
        recommendationsText += '2. Use mulch to conserve soil moisture.<br>';
        recommendationsText += '3. Group plants closely to create a microclimate with higher humidity.<br>';
    }

    if (isHealthy) {
        document.getElementById('healthy-button').style.backgroundColor = 'green';
        document.getElementById('poor-button').style.backgroundColor = 'white';
        recommendations.innerHTML = 'The crop is healthy.';
    } else {
        document.getElementById('healthy-button').style.backgroundColor = 'white';
        document.getElementById('poor-button').style.backgroundColor = 'green';
        recommendations.innerHTML = recommendationsText;
    }
});

document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('temperature').value = '';
    document.getElementById('humidity').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('healthy-button').style.backgroundColor = 'white';
    document.getElementById('poor-button').style.backgroundColor = 'white';
    document.getElementById('recommendations').innerHTML = '';
});
