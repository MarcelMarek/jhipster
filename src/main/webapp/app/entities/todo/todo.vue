<template>
  <div>
    <h2 id="page-heading" data-cy="TodoHeading">
      <span v-text="$t('todoApp.todo.home.title')" id="todo-heading">Todos</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('todoApp.todo.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'TodoCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-todo">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('todoApp.todo.home.createLabel')"> Create a new Todo </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && todos && todos.length === 0">
      <span v-text="$t('todoApp.todo.home.notFound')">No todos found</span>
    </div>
    <div class="table-responsive" v-if="todos && todos.length > 0">
      <table class="table table-striped" aria-describedby="todos">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('todo')">
              <span v-text="$t('todoApp.todo.todo')">Todo</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'todo'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('priority')">
              <span v-text="$t('todoApp.todo.priority')">Priority</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'priority'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TodoView', params: { todoId: todo.id } }">{{ todo.id }}</router-link>
            </td>
            <td>{{ todo.todo }}</td>
            <td>{{ todo.priority }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TodoView', params: { todoId: todo.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TodoEdit', params: { todoId: todo.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(todo)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <infinite-loading
          ref="infiniteLoading"
          v-if="totalItems > itemsPerPage"
          :identifier="infiniteId"
          slot="append"
          @infinite="loadMore"
          force-use-infinite-wrapper=".el-table__body-wrapper"
          :distance="20"
        >
        </infinite-loading>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="todoApp.todo.delete.question" data-cy="todoDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-todo-heading" v-text="$t('todoApp.todo.delete.question', { id: removeId })">
          Are you sure you want to delete this Todo?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-todo"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeTodo()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./todo.component.ts"></script>
