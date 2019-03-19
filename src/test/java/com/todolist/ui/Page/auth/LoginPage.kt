package com.todolist.ui.Page.auth

import com.todolist.ui.BrowserTest.Browser
import com.todolist.ui.BrowserTest.Page

class LoginPage : Page() {
    override fun url(): String {
        return "/"
    }
    override fun assertPage(browser: Browser) {
        browser.assertPathIs(url())
    }

    override fun elements(): Map<String, String> {
        return mapOf(
                "@username" to "#username",
                "@password" to "#password",
                "@loginButton" to "button[type=submit]",
                "@dashboard-header" to "#app > div.content-wrapper > section > div > div:nth-child(1) > div.col-md-12 > div > div.card-header > h6 > span > strong"
        )
    }
}
