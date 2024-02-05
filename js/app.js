// 3d scroll 

let zSpacing = -1000, // ось Z это расстояние от текста до фотографии //
        lastPos = zSpacing / 5,  // анимация стартовой позиции элементов 
        $frames = document.getElementsByClassName('frame'), // $frames главный родительский эл. 
        // применяем byclassname что бы работать с ним как с массивом и применять разные приемы
        frames = Array.from($frames), // задаем переменную и преобразуем ее в массив применяя к эл. из frames
        zVals = []  // переменная будет наполнять пустой массив значениями

        // основная логика скролла
window.onscroll = function() { // расстояние сверху до текущей позиции
    let top = document.documentElement.scrollTop,
        // дельта вычисляет из последней позиции при скролле позицию top
        delta = lastPos - top
        // и если мы продолжаем скроллить с того момента где остановились, оно обновляется и заного берет эти значения 
        // он или увеличивается, или уменьшается, смотря куда скроллим
    lastPos = top

    // проходимся циклом по frame n- текущий обрабатываемый эл. i это индекс его//
    frames.forEach(function(n, i) {
        //пушим в zVals обновленные значения что бы задать каждому эл. по убывающей
        // и добавляем текущий zSpacing что бы было пространство до первого кадра
        zVals.push((i * zSpacing) + zSpacing)
        zVals[i] += delta * -5  // скорость пролистывания (уже работаем с текущим элементом)
        let frame = frames[i],  // переопределяем конкретный фрейм на фрейм по индексу
            transform = `translateZ(${zVals[i]}px)`,  //меняем транзишен
            // задаем прозрачность пропадание при скроле
            opacity = zVals[i] < Math.abs(zSpacing) / 1.6 ? 1 : 0
        //обратные ковычки это интерполяция    
        frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)  // задаем атрибуты CSS каждому фрейму
    })
}        

window.scrollTo(0, 1)

// Audio

let soundButton = document.querySelector('.soundbutton'),
		audio = document.querySelector('.audio')

soundButton.addEventListener('click', e => {
	soundButton.classList.toggle('paused')
	audio.paused ? audio.play() : audio.pause()
})

window.onfocus = function() {
	soundButton.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function() {
	audio.pause()
}