<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 id="todoApp.todo.home.createOrEditLabel" data-cy="TodoCreateUpdateHeading" v-text="$t('todoApp.todo.home.createOrEditLabel')">
          Create or edit a Todo
        </h2>
        <div>
          <div class="form-group" v-if="todo.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="todo.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('todoApp.todo.todo')" for="todo-todo">Todo</label>
            <input
              type="text"
              class="form-control"
              name="todo"
              id="todo-todo"
              data-cy="todo"
              :class="{ valid: !$v.todo.todo.$invalid, invalid: $v.todo.todo.$invalid }"
              v-model="$v.todo.todo.$model"
              required
            />
            <div v-if="$v.todo.todo.$anyDirty && $v.todo.todo.$invalid">
              <small class="form-text text-danger" v-if="!$v.todo.todo.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.todo.todo.minLength" v-text="$t('entity.validation.minlength', { min: 3 })">
                This field is required to be at least 3 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('todoApp.todo.priority')" for="todo-priority">Priority</label>
            <input
              type="number"
              class="form-control"
              name="priority"
              id="todo-priority"
              data-cy="priority"
              :class="{ valid: !$v.todo.priority.$invalid, invalid: $v.todo.priority.$invalid }"
              v-model.number="$v.todo.priority.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.todo.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./todo-update.component.ts"></script>
