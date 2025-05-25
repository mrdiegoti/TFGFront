import { Component, type OnInit, HostListener } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  menuAbierto = false
  userMenuOpen = false
  pageLoaded = false
  isScrolled = false
  showScrollTop = false

  ngOnInit() {
    // Page loading animation
    setTimeout(() => {
      this.pageLoaded = true
    }, 2500)

    // Close menus when clicking outside
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // Close mobile menu
      if (this.menuAbierto && !target.closest(".mobile-nav") && !target.closest(".mobile-menu-toggle")) {
        this.cerrarMenu()
      }
      
      // Close user menu
      if (this.userMenuOpen && !target.closest(".user-menu-wrapper")) {
        this.userMenuOpen = false
      }
    })

    // Initialize AOS (Animate On Scroll) if available
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
      })
    }

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    this.isScrolled = scrollTop > 100
    this.showScrollTop = scrollTop > 500
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024 && this.menuAbierto) {
      this.cerrarMenu()
    }
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto
    
    // Prevent scrolling when menu is open
    if (this.menuAbierto) {
      document.body.style.overflow = "hidden"
      document.body.classList.add('menu-open')
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove('menu-open')
    }
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen
  }

  cerrarMenu() {
    this.menuAbierto = false
    this.userMenuOpen = false
    document.body.style.overflow = ""
    document.body.classList.remove('menu-open')
  }

  logout() {
    // Add logout animation
    const logoutBtn = document.querySelector('.logout')
    if (logoutBtn) {
      logoutBtn.classList.add('logging-out')
    }
    
    setTimeout(() => {
      localStorage.removeItem("token")
      window.location.href = "/"
      this.cerrarMenu()
    }, 800)
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}