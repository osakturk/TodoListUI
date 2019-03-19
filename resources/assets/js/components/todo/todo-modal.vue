<template>
    <div class="modal fade" id="todoModal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">To-do Item</h4>
                    <button type="button" class="close" @click="closeInterviewModal"><i class="fa fa-times"
                                                                                        aria-hidden="true"></i></button>
                </div>
                <div class="form-inline">
                    <div>
                        <label class="form-group">Name</label>
                        <input v-model="search_name" type="text" class="form-control">
                    </div>
                    <div style="margin-left: 10px">
                        <label class="form-group">Complete</label>
                        <select v-model="search_complete">
                            <option value="0">Waiting</option>
                            <option value="1">Completed</option>
                        </select>
                    </div>
                    <div style="margin-left: 10px">
                        <label class="form-group">Dead Line</label>
                        <input v-model="search_dead_line" type="datetime-local" class="form-control">
                    </div>
                    <div style="margin-left: 10px">
                        <button type="button" class="btn btn-success" @click="submitSearch">
                            <i class="fa fa-check"></i>
                        </button>
                    </div>
                </div>
                <loading v-show="busy"></loading>
                <div class="modal-body">


                    <table width="" class="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>DeadLine</th>
                            <th>Complete</th>
                            <th style="margin-left: 10px;color: mediumblue;" @click="toggleForm">
                                <i class="fa fa-plus-square-o"></i>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="list in lists">
                            <td>{{list.name}}</td>
                            <td>{{list.description}}</td>
                            <td>{{list.dead_line}}</td>
                            <td>
                                <i class="fa" :class="itemStatusIcon(list.complete_status)"></i>
                            </td>
                            <td @click="deleteList(list)"><i class="fa fa-trash"
                                                                                       style="color: red"></i></td>
                        </tr>
                        </tbody>
                    </table>

                    <div v-if="isTodoList">
                        <div class="form-group">
                            <label class="control-label">Name</label>
                            <input v-model="name" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="control-label">Description</label>
                            <input v-model="description" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="control-label">Dead Line</label>
                            <input v-model="dead_line" type="datetime-local" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="control-label">Complete Status</label>
                            <br>
                            <select v-model="complete_status">
                                <option value="0">Waiting</option>
                                <option value="1">Completed</option>
                            </select>
                        </div>
                        <div class="pull-right">
                            <button type="button" class="btn btn-link" @click="isTodoList = false">
                                <i class="fa fa-remove"></i>
                            </button>
                            <button type="button" class="btn btn-success" @click="addToList">
                                <i class="fa fa-save"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Loading from '../loading.vue';
    export default {
        components:{
            Loading
        },
        data: () => ({
            id: null,
            lists: [],
            url: '/items',
            name: '',
            description: '',
            dead_line: '',
            complete_status: '',
            search_name: '',
            search_complete: '',
            search_dead_line: '',
            isTodoList: false,
            busy: false,
            todoId: ''
        }),
        mounted() {
            this.busy = true;
            eventHub.$on('todo-item-modal:open', this.openTodoItemModal);
        },
        methods: {
            toggleForm() {
                this.isTodoList = !this.isTodoList;
            },

            addToList() {
                let params = this.prepareData();
                params.append("list_id", this.todoId);
                axios.post(this.url, params).then(response => {
                    console.log(response.data);
                    this.isTodoList = false;
                    this.getTodoItemList(this.todoId);

                }).catch(error => {
                    console.log(error);
                });
            },
            deleteList(list) {
                axios.delete(this.url + "/" + list.id).then(response => {
                    console.log(response.data);
                    this.lists.splice(this.lists.indexOf(list), 1);
                }).catch(error => {
                    console.log(error);
                });
            },
            prepareData() {
                const self = this;
                let data = new URLSearchParams();

                Object.keys(self.$data).forEach(function (key, index) {
                    if (key !== 'busy') {
                        data.append(key, self.$data[key]);
                    }
                });

                return data;
            },
            prepareSearchData() {
                const self = this;
                let data = new URLSearchParams();

                data.append('search_name', self.$data.search_name);
                data.append('search_complete', self.$data.search_complete);
                data.append('search_dead_line', self.$data.search_dead_line);


                return data;
            },
            getTodoItemList(id) {
                this.busy = true;
                this.todoId = id;
                axios.get(this.url + '/' + id, null).then(response => {
                    this.lists = response.data.data;
                    this.busy = false;
                }).catch(error => {
                    console.log(error);
                })
            },
            openTodoItemModal(id) {
                this.id = id;
                $('#todoModal').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                this.getTodoItemList(id);
            },
            closeInterviewModal() {
                $(this.$el).modal('hide');
                this.resetItems();
            },
            submitSearch() {
                this.busy = true;
                let params = this.prepareSearchData();
                axios.get(this.url + "/" + this.id, {params}).then(response => {
                    this.lists = response.data.data;
                    this.busy = false;
                }).catch(error => {
                    console.log(error);
                });
            },
            resetItems(){
                this.name= '',
                    this.description= '',
                    this.dead_line='',
                    this.complete_status=''
            },

            itemStatusIcon(status) {
                return status ? 'fa-check' : 'fa-clock-o';
            }
        }

    }
</script>
<style scoped>
    .form-group {
        clear: both;
        width: 100%;
    }

    .todo-item {
        cursor: pointer;
        margin-bottom: 5px;
    }

    .todo-item:hover {
        background-color: #f0eeee;
    }
</style>