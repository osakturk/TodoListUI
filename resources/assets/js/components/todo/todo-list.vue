<template>
    <div class="todolist-report row">
        <todo-add-modal></todo-add-modal>
        <todo-modal></todo-modal>
        <loading v-show="busy"></loading>
        <div class="modal-body">
            <div class="right-sidebar-top pull-right">
                <a data-placement="bottom" @click="openAddTodoListModal()">
                    <i class="fa fa-plus-circle"></i></a>
            </div>

            <div class="row">
                <strong class="col-md-2">User Name</strong>
                <strong class="col-md-2">To-do List Name</strong>

            </div>

            <div class="row btn-default todo-list" v-for="todo in todoList">
                <div class="col-md-2"><i class="fa fa-comment" aria-hidden="true"></i> - {{ todo.user_name }}</div>
                <div class="col-md-2">{{ todo.name }}</div>
                <button class="btn btn-primary pull-right" data-placement="bottom" @click="openTodoItemModal(todo.id)">
                    <i class="fa fa-list"></i></button>
                <button class="btn btn-primary pull-right" data-placement="bottom" @click="deleteTodoList(todo.id)">
                    <i class="fa fa-trash-o"></i></button>
            </div>
        </div>
    </div>
</template>

<style>
    .todo-list {
        cursor: pointer;
        margin-bottom: 5px;
    }

    .todo-list:hover {
        background-color: #f0eeee;
    }
</style>
<script>
    import TodoModal from '../todo/todo-modal.vue';
    import TodoAddModal from '../todo/todo-list-modal.vue'
    import Loading from '../loading.vue'

    export default {
        components: {
            TodoModal,
            TodoAddModal,
            Loading
        },

        data: () => ({
            todoList: [],
            tooltipText: null,
            todoId: '',
            busy: false
        }),

        mounted() {
            this.getTodoList();
            eventHub.$on('return-todo-list',this.getTodoList);
        },

        methods: {
            openTodoItemModal(id) {
                eventHub.$emit('todo-item-modal:open', id);
            },
            openAddTodoListModal() {
                eventHub.$emit('add-todo-list-modal:open')
            },

            getTodoList() {
                this.busy = true;
                axios.get('/list').then(response => {
                    this.todoList = response.data.data;
                    this.busy = false;
                });
            },
            deleteTodoList(id){
                this.busy = true;
                axios.delete('/list'+'/'+id).then(response => {
                this.getTodoList();
                this.busy = false;
                });
            }
        }
    }
</script>