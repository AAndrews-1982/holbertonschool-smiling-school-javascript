/***** HOMEPAGE - Quotes Carousel ****/

$(document).ready(function() {
$.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    type: "get",
    beforeSend: function() {
    $("#QuotesLoader").show();
    },
        success: function(response) {
            $("#QuotesLoader").hide();
            for (let i=0; i < response.length; i++) {
                let $html = $(`
                <div class=" quote carousel-item ${i === 0 ? 'active' : ''}">
                    <div class="row mx-auto align-items-center">
                        <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                            <img src=${response[i].pic_url} class="d-block align-self-center" alt="Carousel Pic"/>
                        </div>
                        <div class="col-12 col-sm-8 offset-sm-2 col-lg-9 offset-lg-0">
                            <div class="quote-text">
                                <p class="text-white"> ${response[i].text} </p>
                                <h4 class="text-white font-weight-bold">${response[i].name}</h4>
                                <span class="text-white">${response[i].title}</span>
                            </div>
                        </div>    
                    </div>
                </div>`);
                $("#quotesCarouselInner").append($html);
            }
        }
});

/*******  Homepage -  POPULAR TUTORIALS  *********/

$.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    type: "get",
    beforeSend: function() {
        $("#videosLoader").show();
    },
    success: function(response) {
        $("#videosLoader").hide();
         // Clear the existing content in the carousel-inner
        $("#popularVideos").empty();

        for (let i = 0; i < response.length; i += 1) {
        let $carouselItem = $('<div class="carousel-item"><div class="row"></div></div>');
    
        for (let j = i; j < i + 4 && j < response.length; j++) {
            let $stars = '';
    
            for (let k = 0; k < response[j].star; k++) {
            $stars += '<img src="./images/star_on.png" width="15px" height="15px">';
            }
    
            for (let k = 0; k < 5 - response[j].star; k++) {
            $stars += '<img src="./images/star_off.png" width="15px" height="15px">';
            }
            let $html = $(`
                 <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
                    <div class="card">
                        <img src="${response[j].thumb_url}" class="card-img-top" alt="Video thumbnail"/>
                        <div class="card-img-overlay text-center">
                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">${response[j].title}</h5>
                            <p class="card-text text-muted">${response[j]["sub-title"]}</p>
                            <div class="creator d-flex align-items-center">
                                <img src="${response[j].author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle"/>
                                <h6 class="pl-3 m-0 main-color">${response[j].author}</h6>
                            </div>
                            <div class="info pt-3 d-flex justify-content-between">
                                <div class="rating">
                                    ${$stars}
                                </div>
                                <span class="main-color">${response[j].duration}</span>
                            </div>
                        </div>
                    </div>  
                </div>`);

            $carouselItem.find('.row').append($html);
            }
            $("#popularVideos").append($carouselItem);
        }
    // Activate the first carousel item
    $("#popularVideos .carousel-item:first-child").addClass("active");
    }
});

/*********  SEARCH PRICING - QUOTES SECTION *************/

// See Quotes carousel


/**********LATEST VIDEOS - SECTION    */

$.ajax({
    url: 'https://smileschool-api.hbtn.info/latest-videos',
    type: "get",
    beforeSend: function() {
        $("#videosLoader").show();
    },
    success: function(response) {
        $("#videosLoader").hide();
         // Clear the existing content in the carousel-inner
        $("#latestVideos").empty();

        for (let i = 0; i < response.length; i += 1) {
        let $carouselItem = $('<div class="carousel-item"><div class="row"></div></div>');
    
        for (let j = i; j < i + 4 && j < response.length; j++) {
            let $stars = '';
    
            for (let k = 0; k < response[j].star; k++) {
            $stars += '<img src="./images/star_on.png" width="15px" height="15px">';
            }
    
            for (let k = 0; k < 5 - response[j].star; k++) {
            $stars += '<img src="./images/star_off.png" width="15px" height="15px">';
            }
            let $html = $(`
                 <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
                    <div class="card">
                        <img src="${response[j].thumb_url}" class="card-img-top" alt="Video thumbnail"/>
                        <div class="card-img-overlay text-center">
                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">${response[j].title}</h5>
                            <p class="card-text text-muted">${response[j]["sub-title"]}</p>
                            <div class="creator d-flex align-items-center">
                                <img src="${response[j].author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle"/>
                                <h6 class="pl-3 m-0 main-color">${response[j].author}</h6>
                            </div>
                            <div class="info pt-3 d-flex justify-content-between">
                                <div class="rating">
                                    ${$stars}
                                </div>
                                <span class="main-color">${response[j].duration}</span>
                            </div>
                        </div>
                    </div>  
                </div>`);

            $carouselItem.find('.row').append($html);
            }
            $("#latestVideos").append($carouselItem);
        }
    // Activate the first carousel item
    $("#latestVideos .carousel-item:first-child").addClass("active");
    }
});













/*********  SEARCH COURSES-SECTION  *************/

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/courses',
        type: "get",
        data: {
          action: 'query',
          list: 'search',
          format: 'json',
          // q: '',
          // topic: 'all',  topic filter value
          // sort: 'most_viewed', order of all courses
        },
        beforeSend: function() {
      $("#CoursesLoader").show();
    },
        success: function(response) {
          $("#CoursesLoader").hide();
          let $t = response.topics;
            $("#topic-dropdownmenu").append(`<button class="btn btn-secondary border-0 rounded-0 search-element w-100 text-left" type="button" id="current-topic" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ${$t[0].substr(0,1).toUpperCase()+ $t[0].substr(1)}
            </button>
            <div class="dropdown-menu" id="topic-menu" aria-labelledby="topic-dropdownmenu"></div>`);
          let $topics = '';
          for (let i = 0; i < $t.length; i++) {
            $topics += `<button data-value="${$t[i]}" class="dropdown-item" type="button">${$t[i].substr(0,1).toUpperCase()+ $t[i].substr(1)}</button>`;
          }
          $("#topic-menu").append($topics);

          let $s = response.sorts;
            $("#sort-dropdownMenu").append(`<button class="btn btn-secondary border-0 rounded-0 search-element w-100 text-left" type="button" id="current-sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ${$s[0].substr(0,1).toUpperCase()+ $s[0].substr(1,3) + ' ' + $s[0].substr(5,1).toUpperCase() + $s[0].substr(6)}
            </button>
            <div class="dropdown-menu" id="sort-menu" aria-labelledby="sort-dropdownMenu"></div>`);
          let $sorts = '';
          for (let i = 0; i < $s.length; i++) {
            $sorts += `<button data-value="${$s[i]}" class="dropdown-item" type="button">${$s[i].substr(0,1).toUpperCase()+ $s[i].substr(1,3) + ' ' + $s[i].substr(5,1).toUpperCase() + $s[i].substr(6)}</button>`;
          }
          $("#sort-menu").append($sorts);
          $.displayCourses('', $('#current-topic').text().trim(), $('#current-sort').text().trim());

          let $topicVal;
          $('#topic-menu button').click(function(e) {
            $topicVal = e.target.getAttribute('data-value');
            $('#current-topic').text(e.target.textContent);
            $.displayCourses($("#user_search").val(), $('#current-topic').text().trim(), $('#current-sort').text().trim());
            console.log($("#user_search").val());
          });
          $('#sort-menu button').click(function(e) {
            $topicVal = e.target.getAttribute('data-value');
            $('#current-sort').text(e.target.textContent);
            $.displayCourses($("#user_search").val(), $('#current-topic').text().trim(), $('#current-sort').text().trim());
          });
          $('#user_search').on('input', function(e) {
            setTimeout(function() {
              $.displayCourses($("#user_search").val(), $('#current-topic').text().trim(), $('#current-sort').text().trim());
            }, 500);
          });
        },
      });

      /*************  RESULT SECTION  ********/
    
      $.displayCourses = function($q, $t, $s) {
        $.ajax({
              url: 'https://smileschool-api.hbtn.info/courses',
              type: "get",
              data: {
                action: 'query',
                list: 'search',
                format: 'json',
                q: $q,
                topic: $t,
                sort: $s,
              },
              beforeSend: function() {
                $("#CoursesLoader").show();
                },
              success: function(response) {
                $("#CoursesLoader").hide();
                let $c = response.courses;
                $("#coursesvideos").empty();
                $("#numvideos").text(`${$c.length === 1 ? '1 video' : $c.length + ' videos'}`);
                for (let i = 0; i < $c.length; i++) {
                  let $stars = '';
                  for (let j = 0; j < $c[i].star; j++) {
                    $stars += '<img src="./images/star_on.png" width="15px" height="15px">';
                  }
                  for (let j = 0; j < 5 - $c[i].star; j++) {
                    $stars += '<img src="./images/star_off.png" width="15px" height="15px">';
                  }
                  let $html = $(`
                  <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
                  <div class="card">
                  <img src="${$c[i].thumb_url}" class="card-img-top" alt="Video thumbnail"/>
                  <div class="card-img-overlay text-center">
                    <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${$c[i].title}</h5>
                    <p class="card-text text-muted">
                    ${$c[i]["sub-title"]}
                    </p>
                    <div class="creator d-flex align-items-center">
                      <img src="${$c[i].author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle"/>
                      <h6 class="pl-3 m-0 main-color">${$c[i].author}</h6>
                    </div>
                    <div class="info pt-3 d-flex justify-content-between">
                      <div class="rating">
                        ${$stars}
                      </div>
                      <span class="main-color">${$c[i].duration}</span>
                    </div>
                  </div>
                </div>
                </div>`);
                $("#coursesvideos").append($html);
                               
                }
      }
    });
  }
});
