import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./pages/auth/auth-layout/auth.component";
import { TodoComponent } from "./pages/todo/todo.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { ViewTodoComponent } from "./pages/view-todo/view-todo.component";

const appRouter: Routes = [
    {path: '', component: AuthComponent, children: [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'login', component: LoginComponent},
        {path: 'registration', component: RegisterComponent},
    ]},
    {path: 'todo', component: TodoComponent},
    {path: 'todo/:id', component: ViewTodoComponent},
    {path: '**', component: NotFoundComponent}
]

@NgModule({
    exports: [],
    imports: [RouterModule.forRoot(appRouter)],
    providers: []
})

export class AppRoutingModule {}