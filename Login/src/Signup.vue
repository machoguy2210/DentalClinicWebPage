<script setup>
</script>

<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="" method="post">
                    <h2>Sign up</h2>
                    <div class="inputbox">
                        <ion-icon name="person-outline"></ion-icon>
                        <input id="name" type="text" minlength="4" required>
                        <label for="name">Fullname</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input id="email" type="email" required>
                        <label for="email">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" id="password" minlength="6" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="call-outline"></ion-icon>
                        <input id="phone" type="tel" required>
                        <label for="phone">Phone number</label>                      
                    </div>
                    <div class="radiobox">
                        <label class="gender">You are:</label>
                        <input name="gender" type="radio" id="male_gender">
                        <label for="male_gender"  class="gender">Male</label>
                        <input name="gender" type="radio" id="female_gender">
                        <label for="female_gender" class="gender">Female</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="location-outline"></ion-icon>
                        <input name="address" id="address" type="text">
                        <label for="address">Address</label>
                    </div>
                    <div class="dateinputbox">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <input id="dob_input"  type="date" required max="2024-01-01">
                        <label for="dob_input">Birthday</label>
                    </div>
                    <button>Create new account</button>
                    <div class="login">
                        <p>Already have an account? <a href="#">Log in</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

* {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
}

section {
    display: flex;
    padding-left: 16rem;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background: url('/public/images/background1.jpg') no-repeat;
    background-position: center;
    background-size: cover;
}

.form-box {
    position: relative;
    width: 400px;
    height: 750px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
}

h2 {
    font-size: 2em;
    color: #ffffff;
    text-align: center;
}

.inputbox {
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #ffffff;

    label {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        color: #ffffff;
        font-size: 1em;
        pointer-events: none;
        transition: 0.5s;
    }

    input:focus ~ label,
    input:valid ~ label {
        top: -5px;
    }

    input {
        width: 100%;
        height: 50px;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1em;
        padding: 0 35px 0 5px;
        color: #ffffff;
    }

    ion-icon {
        position: absolute;
        right: 8px;
        color: #ffffff;
        font-size: 1.2em;
        top: 20px;
    }
}

.dateinputbox {
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid #ffffff;

    label {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        color: #ffffff;
        font-size: 1em;
        pointer-events: none;
        transition: 0.5s;
    }

    input {
        width: 100%;
        height: 50px;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1em;
        margin-left: 100px;
        color: #ffffff;
    }

    ion-icon {
        position: absolute;
        right: 8px;
        color: #ffffff;
        font-size: 1.2em;
        top: 20px;
    }
}

button {
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
}

.login {
    font-size: 0.9em;
    color: #ffffff;
    text-align: center;
    margin: 25px 0 10px;

    p a {
        text-decoration: none;
        color: #ffffff;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
}

.radiobox {
    display: flex;
    justify-content: space-between;
    width: 310px;
}

.gender {
    color: #ffffff;
}
</style>