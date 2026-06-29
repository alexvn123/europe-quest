* {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

body {
    background: #f0f4f8;
    max-width: 720px;
    margin: 2rem auto;
    padding: 0 1rem;
    text-align: center;
}

header {
    margin-bottom: 1.5rem;
}

#header-img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

h1 {
    color: #1a4b8c;
    margin-top: 1rem;
}

.screen {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 1.5rem;
}

.hidden {
    display: none;
}

.small-img {
    width: 90px;
    height: auto;
    margin-bottom: 1rem;
}

#questionImage img {
    max-width: 220px;
    max-height: 150px;
    margin: 1rem auto;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
}

input, select, button {
    padding: 0.75rem;
    font-size: 1rem;
    margin: 0.5rem 0;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 100%;
}

button {
    background: #2c5c97;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
}

button:hover {
    background: #234a7a;
}

.stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem;
    margin: 1rem 0;
    font-weight: bold;
    font-size: 1rem;
    color: #333;
}

#timer {
    color: #d63031;
    font-weight: bold;
}

.options button {
    background: #4a7cb8;
    margin: 0.4rem 0;
}

.options button:hover {
    background: #3b6696;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th, td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background: #2c5c97;
    color: white;
}
