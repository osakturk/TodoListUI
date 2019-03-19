package com.todolist.ui

import com.todolist.ui.Page.auth.LoginPage
import com.todolist.ui.BrowserTest.TestCase
import org.junit.Test

class LoginPageTest : TestCase() {

    @Test
    fun see_login_page() {
        browse({ browser ->
            browser.visit("login")
                    .assertSee("Remember me")
        })

    }

    @Test
    fun see_error_message_when_username_and_password_empty() {
        browse({ browser ->
            loginAs(browser,"","")
                    .on(LoginPage())
                    .assertSee("Username and Password cannot be empty.")
        })

    }

    @Test
    fun see_error_message_when_username_empty() {
        browse({ browser ->
            loginAs(browser,"","test")
                    .on(LoginPage())
                    .assertSee("Username and Password cannot be empty.")
        })

    }

    @Test
    fun see_error_message_when_password_empty() {
        browse({ browser ->
            loginAs(browser,"test","")
                    .on(LoginPage())
                    .assertSee("Username and Password cannot be empty.")
        })

    }

    @Test
    fun see_error_message_when_username_and_password_invalid() {
        browse({ browser ->
            loginAs(browser,"test","test")
                    .on(LoginPage())
                    .assertSee("Credentials does not match.")
        })

    }

    @Test
    fun can_login() {
        browse({ browser ->
            loginAs(browser)
                    .on(LoginPage())
                    .waitForText("@dashboard-header","Giden Çağrı Analizi")
        })

    }
}
