package com.todolist.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TodoListController {
    @RequestMapping(value = "/")
    public String home(Model model) {
        model.addAttribute("reportId", 0);
        return "todo_list/index";
    }
}
