
$(document).ready(function () {
    var MQ = MathQuill.getInterface(2);
    var mathField = MQ.MathField(mathFieldEl, {
        spaceBehavesLikeTab: true,
        handlers: {
            edit: function () {
                var latex = mathField.latex();
                renderMath(latex);
                $('#RenderedMathContainer').html(latex);
            }
        },
    });
    $('#mathedit-latex-input-field').keydown(function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});

function insertLatex(latexExpression) {
    var mathField = MathQuill.getInterface(2).MathField(document.getElementById('mathedit-latex-input-field'));
    mathField.write(latexExpression);
}

function renderMath(latex) {
    var renderedMath = $('<div class="rendered-math"></div>');
    var staticMath = MathQuill.getInterface(2).StaticMath(renderedMath[0]);
    staticMath.latex(latex);
    $('#RenderedLatex').html(renderedMath);
}
