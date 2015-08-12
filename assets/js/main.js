//magic goes here

var days = [[180,300,510,120,330],[120,1320],[30,210,30,210,30,210,30,210,30,210,30,210],[20,220,20,220,20,220,20,220,20,220,20,220],[60,300,1080],[340,1080,20],[60,360,1020],[60,360,1020],[240,1200],[60,180,1200],[60,240,1140],[240,1080,120]];
var type = [[0,1,0,1,0],[1,0],[1,0,1,0,1,0,1,0,1,0,1,0],[1,0,1,0,1,0,1,0,1,0,1,0],[0,1,0],[1,0,1],[0,1,0],[0,1,0],[1,0],[0,1,0],[0,1,0],[1,0,1]];
var people = ['Winston Churchill', 'Nikola Tesla', 'Thomas Edison', 'Leonardo Da Vinci', 'Wolfgang Mozart', 'Richard Branson', 'Sigmund Freud', 'Barack Obama', 'Voltaire', 'Donald Trump', 'Margaret Thatcher', 'Benjamin Franklin'];
var HTML = '';
var agg;
var det;

function breakperiods(element, index) {
    var retval = '';
    element.forEach(function(ele, i, arr){
        retval += '<div class="period ';
        console.log(index, i);
        if(type[index][i] === 0){
            retval += 'inactive ';
            retval += '" style="width:' +  ele/1440 * 100 + '%; z-index:' + index + ';">' + Math.floor(ele / 60) + 'h' + ele%60 +'m' + '</div>';
        }
        if(type[index][i] === 1){
            retval += 'active ';
            retval += '" style="width:' +  ele/1440 * 100 + '%; z-index:' + index + ';">' + '&nbsp' + '</div>';
        }
        
    });
    return retval;
}

function breakdays(element, index, array) {
    HTML += '<div class="day"><div class="name">' + people[index] + '</div>' + breakperiods(element, index) + '</div>';
}

function getHTML() {  
    days.forEach(breakdays);
    $('#stage').css('height',days.length*65 + 'px');
    $('#stage').append(HTML);
}

function setDaymargins() {
    $('.day').each(function(index){
        $(this).css('margin-top', 60*index + 'px'); 
    });
}

window.onload = function(){
    getHTML();
    setDaymargins();
};

$('#aggregate').click(function(){
    if($('#stage').hasClass('aggregate') === false) {
        clearTimeout(det);
        $('.name').hide();
        $('.day').each(function(index){
            $(this).addClass('close');       
        });    
        agg1 = setTimeout(function(){
            $('#stage').css('height','110px');
            $('.day').each(function(index){
                $(this).css('margin-top', '0px'); 
            });
            setTimeout(function(){
                $('.day').each(function(index){
                    $(this).removeClass('close');       
                });
                $('#stage').removeClass('detail');
                $('#stage').addClass('aggregate');
            },1000);
        },500);
        
    }
});

$('#details').click(function(){
    if($('#stage').hasClass('detail') === false) {
        $('#stage').removeClass('aggregate');
        $('#stage').addClass('detail');
        clearTimeout(agg);
        $('.day').each(function(index){
            $(this).addClass('close'); 
        });
        det = setTimeout(function(){
            $('#stage').css('height',days.length*65 + 'px');
            $('.day').each(function(index){
                $(this).css('margin-top', 60*index + 'px'); 
            });
            setTimeout(function(){
                $('.day').each(function(index){
                    $(this).removeClass('close');       
                });  
                $('.name').show();
            },1000);
        },500);
    }
});


