import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { ITodo, Todo } from '@/shared/model/todo.model';
import TodoService from './todo.service';

const validations: any = {
  todo: {
    todo: {
      required,
      minLength: minLength(3),
    },
    priority: {},
  },
};

@Component({
  validations,
})
export default class TodoUpdate extends Vue {
  @Inject('todoService') private todoService: () => TodoService;
  @Inject('alertService') private alertService: () => AlertService;

  public todo: ITodo = new Todo();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.todoId) {
        vm.retrieveTodo(to.params.todoId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.todo.id) {
      this.todoService()
        .update(this.todo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todoApp.todo.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.todoService()
        .create(this.todo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('todoApp.todo.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveTodo(todoId): void {
    this.todoService()
      .find(todoId)
      .then(res => {
        this.todo = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
