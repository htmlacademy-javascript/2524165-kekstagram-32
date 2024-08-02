const defaultEffect = 'none';
const effectsStyles = {
  chrome: {
    style: 'grayscale',
    unit: '',
  },
  sepia: {
    style: 'sepia',
    unit: '',
  },
  marvin: {
    style: 'invert',
    unit: '%',
  },
  phobos: {
    style: 'blur',
    unit: 'px',
  },
  heat: {
    style: 'brightness',
    unit: '',
  },
};

const effectsSliderOptions = {
  none: {
    min: 1,
    max: 3,
    step: 0.1,
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const sliderValue = sliderContainer.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');

let currentEffect = defaultEffect;

function createSlider (effect) {
  const {min, max, step} = effectsSliderOptions[effect];
  noUiSlider.create(slider, {
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
}

function setEffect (effect) {
  currentEffect = effect;
  if (currentEffect === defaultEffect) {
    hideSlider();
  } else {
    showSlider();
  }
  setSliderOptions();
}

function setSliderOptions () {
  const {min, max, step} = effectsSliderOptions[currentEffect];
  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });
}

function setImageStyle (effectValue) {
  if (currentEffect === defaultEffect) {
    imgUploadPreview.style.filter = null;
  } else {
    const style = effectsStyles[currentEffect].style;
    const unit = effectsStyles[currentEffect].unit;
    imgUploadPreview.style.filter = `${style}(${effectValue}${unit})`;
  }
}

function onSliderUpdate () {
  const currentValue = slider.noUiSlider.get();
  sliderValue.value = currentValue;
  setImageStyle(currentValue);
}

function onEffectsListElementChange (evt) {
  setEffect(evt.target.value);
}

function showSlider () {
  sliderContainer.classList.remove('hidden');
  slider.classList.remove('hidden');
}

function hideSlider () {
  sliderContainer.classList.add('hidden');
  slider.classList.add('hidden');
}

function initEffect () {
  createSlider(defaultEffect);
  effectsList.addEventListener('change', onEffectsListElementChange);
}

function resetEffect () {
  setEffect(defaultEffect);
}

export { initEffect, resetEffect };
