import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.')
  }
  menuAbierto = false
  pageLoaded = false

  ngOnInit() {
    // Simulate page loading animation
    setTimeout(() => {
      this.pageLoaded = true
    }, 500)

    // Close menu when clicking outside
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (this.menuAbierto && !target.closest(".nav-links") && !target.closest(".menu-toggle")) {
        this.cerrarMenu()
      }
    })
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto
    // Prevent scrolling when menu is open
    if (this.menuAbierto) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  cerrarMenu() {
    this.menuAbierto = false
    document.body.style.overflow = ""
  }

  logout() {
    localStorage.removeItem("token")
    window.location.href = "/"
    this.cerrarMenu()
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token'); // o usa un AuthService si lo tienes
}

}
