package com.todolist.ui.BrowserTest.Concerns

import com.todolist.ui.BrowserTest.Browser
import org.openqa.selenium.JavascriptExecutor

interface InteractsWithJavascript {
    fun script(script: String) = ((this as Browser).driver as JavascriptExecutor).executeScript(script)
}