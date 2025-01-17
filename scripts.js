$(document).ready(function() 
{

  /** Quotes loader*/

  loadQuotes('https://smileschool-api.hbtn.info/quotes', '#carouselExampleControls');

  /** Popular Video Loader */

  loadVideos('https://smileschool-api.hbtn.info/popular-tutorials', '#carouselExampleControls2');

  /** Latest Video Loader */

  loadVideos('https://smileschool-api.hbtn.info/latest-videos', '#carouselExampleControls3');

  /** Search Video Loader */

  searchLoadVideoCards('https://smileschool-api.hbtn.info/courses');


$('#searchInput, #topicDropdown, #sortByDropdown').on('change', handleDropdownChanges);
});

/** Quote Cards Loader */

function createQuoteCard(quote, isActive) {
  return $(`
      <div class="carousel-item${isActive ? ' active' : ''}">
          <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img src="${quote.pic_url}" class="d-block align-self-center" alt="${quote.name}">
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                  <div class="quote-text">
                      <p class="text-white">« ${quote.text}</p>
                      <h4 class="text-white font-weight-bold">${quote.name}</h4>
                      <span class="text-white">${quote.title}</span>
                  </div>
              </div>
          </div>
      </div>
  `);
}

/** Carousel Quotes Loader */

function loadQuotes(url, idSelector) {
  const carouselInner = $(idSelector + ' .carousel-inner .loadItems');
  $('.loader').show();

  $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(quotes) {
          $('.loader').hide();
          carouselInner.empty();

          $.each(quotes, function(index, quote) {
              const carouselItem = createQuoteCard(quote, index === 0);
              carouselInner.append(carouselItem);
          });

      },
      error: function(error) {
          console.error('Error: ', error);
          $('.loader').hide();
      }
  });
}

/* This will load Video Cards Carousel with 4 columns in a row / It will scroll
through 8 items / A loader will appear while fetching Json data */

/** Create Video cards */

function createVideoCard(video) {
  // Create star rating element
  let stars = '';
  for (let i = 0; i < 5; i++) {
      if (i < video.star) {
          stars += '<img src="images/star_on.png" alt="Star On" width="15px" />';
      } else {
          stars += '<img src="images/star_off.png" alt="Star Off" width="15px" />';
      }
  }

  // creates a column for each item
  let cardCol = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');

  // Creates the  card HTML
  let cardHtml = `
      <div class="card">
          <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail" />
          <div class="card-img-overlay text-center">
              <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
          </div>
          <div class="card-body">
              <h5 class="card-title font-weight-bold">${video.title}</h5>
              <p class="card-text text-muted">${video['sub-title']}</p>
              <div class="creator d-flex align-items-center">
                  <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                  <h6 class="pl-3 m-0 main-color">${video.author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating ">${video.star > 0 ? stars : ''}
                  </div>
                  <span class="main-color">${video.duration}</span>
              </div>
          </div>
      </div>
  `;
  // append card to each column
  cardCol.append(cardHtml);

  return cardCol;
}

function getItemsPerSlide() {
  const width = $(window).width();
  if (width >= 992) {
      return 4;
  } else if (width >= 768) {
      return 2;
  } else {
      return 1;
  }
}

/** Carousel Video Loader */

function loadVideos(url, idSelector) {
  const carouselInner = $(idSelector + ' .carousel-inner .loadItems');
  $('.loader').show();

  $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(videos) {
          $('.loader').hide();
          carouselInner.empty();

          $.each(videos, function(index, video) {
              const videoCard = createVideoCard(video);
              carouselInner.append(videoCard);

              let itemsPerSlide = getItemsPerSlide();
              if ((index % itemsPerSlide) === 0) {
                  const carouselItem = $('<div>').addClass('carousel-item');
                  carouselInner.append(carouselItem);
                  if (carouselInner.children().length < itemsPerSlide || index === 0) {
                      carouselItem.addClass('active');
                  }
              }
          });
      },
      error: function(error) {
          $('.loader').hide();
          console.error('Error:', error);
      }
  });
}

// Populates the Topic dropdown with dynamic selectors
function populateTopicDropdown(data) {
  const topicDropdown = $('#topicDropdown');
  topicDropdown.empty(); // Clears options

  // Add dynamic options based on data
  data.topics.forEach(function (topic) {
      topicDropdown.append($('<option>', {
          value: topic,
          text: topic,
      }));
  });
}

// Populates the Sort By dropdown with dynamic selectors
function populateSortByDropdown(data) {
  const sortByDropdown = $('#sortByDropdown');
  sortByDropdown.empty(); // Clears options

  // This will add dynamic options
  data.sorts.forEach(function (sort) {
      sortByDropdown.append($('<option>', {
          value: sort,
          text: sort,
      }));
  });
}

// Loads Video Cards based on search parameters
function searchLoadVideoCards(url) {
  const searchInput = $('#searchInput').val();
  const selectedTopic = $('#topicDropdown').val();
  const selectedSortBy = $('#sortByDropdown').val();
  const videoCardsContainer = $('#videoCardsContainer');
  const loader = $('.loader');

  // This will show loader while fetching data
  loader.show();
  videoCardsContainer.empty(); // Clear existing video cards

  // AJAX request to the API
  $.ajax({
      url: url,
      type: 'GET',
      data: {
          q: searchInput,
          topic: selectedTopic,
          sort: selectedSortBy,
      },
      dataType: 'json',
      success: function (data) {
          // Hide loader after data is fetched
          loader.hide();

          // Populates the Topic and Sort By dropdowns
          populateTopicDropdown(data);
          populateSortByDropdown(data);

          // This will add dynamic video cards based on the API response
          data.courses.forEach(function (course) {
              // Create and append video card elements here
              const videoCard = createVideoCard(course);
              videoCardsContainer.append(videoCard);
          });
      },
      error: function (error) {
          // Hides loader and handles errors
          loader.hide();
          console.error('Error:', error);
      }
  });
}

// Function that handles changes in the search input of all dropdowns
function handleDropdownChanges() {
  // This will delay the API request
  clearTimeout(this.delay);
  this.delay = setTimeout(function () {
      searchLoadVideoCards('https://smileschool-api.hbtn.info/courses');
  }, 300);

}