class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.sliderBoxItemWidth = 700;
        this.index = 0;
        this.timer = null;
        this.sliderBox = null;
        this.len = this.data.length;
    }

    init() {
        this.renderUI();
        this.autoPlayer();
        this.eventMouseHandler();
        this.eventClickHandler();
        this.eventClickWitnSliderNav();
    }
    renderUI() {
        this.root = document.createElement("div");
        this.root.classList.add("slider");
        let tpl1 = this.data.map((ele, index) => `<li class="slider-box-item"><img src=${ele}></li>`).join("");
        let html1 = `<ul class="slider-box">${tpl1}</ul>`;
        let html2 = `<div class="slider-control"><span class="prev">&lt;</span> <span class="next">&gt;</span></div>`;
        let tpl2 = this.data.map((ele, index) => `<li class=slider-nav-item ${index == 0 ? "active":""}>${index+1}</li>`).join("");
        let html3 = `<ol class="slider-nav">${tpl2}</ol>`;
        this.root.innerHTML = html1 + html2 + html3;
        document.body.appendChild(this.root);
        this.sliderBox = this.root.querySelector(".slider-box");
        this.sliderNav = this.root.querySelector(".slider-nav");
    }
    autoPlayer() {
        this.timer = setInterval(() => this.next(), 2000);
    }
    eventMouseHandler() {
        this.root.onmouseenter = () => clearInterval(this.timer);
        this.root.onmouseleave = () => this.autoPlayer();
    }
    eventClickHandler() {
        let sliderControl = this.root.querySelector(".slider-control");
        sliderControl.onclick = (e) => {
            e = e || window.event;
            let target = e.target || e.srcElement;
            if (target.className == "prev") {
                this.prev();

            } else if (target.className == "next") {
                this.next();
            }
        }
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchNavItem();
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchNavItem();
    }
    eventClickWitnSliderNav() {
        Array.from(this.sliderNav.children).forEach((ele, index) => {
            ele.onclick = () => {
                this.index = index;
                this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
                this.switchNavItem();
            }
        });
    }
    switchNavItem() {
        Array.from(this.sliderNav.children).forEach((ele => ele.classList.remove("active")));
        this.sliderNav.children[this.index].classList.add("active");
    }
}