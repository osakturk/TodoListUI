package com.todolist.ui.BrowserTest

import com.todolist.ui.BrowserTest.Concerns.InteractsWithElements
import com.todolist.ui.BrowserTest.Concerns.InteractsWithJavascript
import com.todolist.ui.BrowserTest.Concerns.MakesAssertions
import com.todolist.ui.BrowserTest.Concerns.WaitsForElements
import org.apache.commons.io.FileUtils
import org.apache.commons.lang3.StringUtils
import org.openqa.selenium.Dimension
import org.openqa.selenium.OutputType
import org.openqa.selenium.TakesScreenshot
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import java.io.File
import java.io.IOException
import java.util.concurrent.TimeUnit

class Browser : InteractsWithElements, InteractsWithJavascript, WaitsForElements, MakesAssertions {
    var driver: WebDriver

    private lateinit var baseUrl: String

    var page: Page? = null

    fun setBaseUrl(baseUrl: String) {
        this.baseUrl = baseUrl
    }

    init {
        val chromeOptions = ChromeOptions()
        chromeOptions.addArguments("--disable-gpu")
        //chromeOptions.addArguments("--headless");

        ChromeProcess().setDriverPath()

        driver = ChromeDriver()
    }

    fun quit() {
        driver.quit()
    }

    fun pause(miliSeconds: Long): Browser {
        TimeUnit.MILLISECONDS.sleep(miliSeconds)

        return this
    }

    fun screenshot(filename: String): Browser {
        val screenshotFile = (driver as TakesScreenshot).getScreenshotAs(OutputType.FILE)

        try {
            FileUtils.copyFile(screenshotFile, File(System.getProperty("user.dir") + "/src/test/screenshots/" + filename + ".png"))
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return this
    }

    fun refresh(): Browser {
        driver.navigate().refresh()

        return this
    }

    fun back(): Browser {
        driver.navigate().back()

        return this
    }

    fun forward(): Browser {
        driver.navigate().forward()

        return this
    }

    fun maximize(): Browser {
        driver.manage().window().maximize()

        return this
    }

    fun resize(width: Int, height: Int): Browser {
        driver.manage().window().size = Dimension(width, height)

        return this
    }

    fun on(page: Page): Browser {
        this.page = page

        page.assertPage(this)

        return this
    }

    fun visit(page: Page): Browser {
        visit(page.url())

        this.on(page)

        return this
    }

    fun visit(url: String): Browser {
        var newUrl = url

        if (!url.startsWith("http://") || !url.startsWith("https://")) {
            newUrl = baseUrl + "/" + StringUtils.stripStart(url, "/")
        }

        driver.get(newUrl)

        return this
    }
}
