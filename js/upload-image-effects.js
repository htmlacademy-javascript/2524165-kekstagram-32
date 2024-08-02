const defaultEffect = 'NONE';
const EffectsStyles = {
  CHROME: {
    style: 'grayscale',
    unit: '',
  },
  SEPIA: {
    style: 'sepia',
    unit: '',
  },
  MARVIN: {
    style: 'invert',
    unit: '%',
  },
  PHOBOS: {
    style: 'blur',
    unit: 'px',
  },
  HEAT: {
    style: 'brightness',
    unit: '',
  },
};

const EffectsSliderOptions = {
  NONE: {
    min: 1,
    max: 3,
    step: 0.1,
  },
  CHROME: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  SEPIA: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  MARVIN: {
    min: 0,
    max: 100,
    step: 1,
  },
  PHOBOS: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  HEAT: {
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
  const {min, max, step} = EffectsSliderOptions[effect];
  noUiSlider.create(slider, {
    range: {
      min,
      max,
    },
    start: max,
    step,
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
  const {min, max, step} = EffectsSliderOptions[currentEffect];
  slider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });
}

function setImageStyle (effectValue) {
  if (currentEffect === defaultEffect) {
    imgUploadPreview.style.filter = null;
  } else {
    const style = EffectsStyles[currentEffect].style;
    const unit = EffectsStyles[currentEffect].unit;
    imgUploadPreview.style.filter = `${style}(${effectValue}${unit})`;
  }
}

function onSliderUpdate () {
  const currentValue = slider.noUiSlider.get();
  sliderValue.value = currentValue;
  setImageStyle(currentValue);
}

function onEffectsListElementChange (evt) {
  const effect = evt.target.value.toUpperCase();
  setEffect(effect);
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
